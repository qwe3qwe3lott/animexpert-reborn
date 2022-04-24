import {Review, ReviewOpinions, ReviewTypes} from '../../types/Review';
import {displayModalMessage} from './displayModalMessage';
import {Request, RequestTypes} from '../../types/Request';
import {infoService} from '../../api/InfoService';
import {randomElement} from '../../util/randomElement';
import {reviewsService} from '../../api/ReviewsService';
import {delay} from '../../util/delay';
import {RootAction, RootState} from '../reducers';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {uniqueValues} from '../../util/uniqueValues';
import {Comment, CommentTypes} from '../../types/Comment';
import {commentsService} from '../../api/CommentsService';
import {requestRegExp} from '../../regularExpressions';

const requestTypeToReviewType = (requestType: RequestTypes): ReviewTypes => {
	switch (requestType) {
	case RequestTypes.Anime:
		return ReviewTypes.Anime;
	case RequestTypes.Manga:
		return ReviewTypes.Manga;
	case RequestTypes.Ranobe:
		return ReviewTypes.Ranobe;
	default:
		throw new Error(`RequestType ${requestType} не может быть преобразован в ReviewType`);
	}
};

const requestTypeToCommentType = (requestType: RequestTypes): CommentTypes => {
	switch (requestType) {
	case RequestTypes.Anime:
		return CommentTypes.Anime;
	case RequestTypes.Manga:
		return CommentTypes.Manga;
	case RequestTypes.Ranobe:
		return CommentTypes.Ranobe;
	default:
		throw new Error(`RequestType ${requestType} не может быть преобразован в CommentTypes`);
	}
};

const requestToReview = async (request: Request, reviewText: string, reviewOpinion: ReviewOpinions): Promise<Review | undefined> => {
	const positions = await infoService.getPositions(request);
	if (positions.length === 0) return;
	const position = randomElement(positions);
	return {
		type: requestTypeToReviewType(request.type),
		text: reviewText,
		opinion: reviewOpinion,
		targetId: position.id
	};
};

const requestToComment = async (request: Request, commentText: string, isOffTopic: boolean): Promise<Comment | undefined> => {
	const positions = await infoService.getPositions(request);
	if (positions.length === 0) return;
	const position = randomElement(positions);
	return {
		type: requestTypeToCommentType(request.type),
		text: commentText,
		commentableId: position.id,
		isOffTopic: isOffTopic
	};
};

const requestToTextLink = async (request: Request) : Promise<string | undefined> => {
	const positions = await infoService.getPositions(request);
	if (positions.length === 0) return;
	const position = randomElement(positions);
	return `[${request.type.toLowerCase()}=${position.id}]`;
};

type RequestTextReplace = {
	textRequestReference: string
	request: Request
}

export const executeReview = (): ThunkAction<Promise<void>, RootState, unknown, RootAction> => async (dispatch, getState) => {
	const reviewState = getState().review;
	const requestsState = getState().requests;
	const isReview = reviewState.isReview;
	const text = reviewState.reviewText;
	const textMinLength = isReview ? 300 : 10;
	if (text.length < textMinLength) return dispatch(displayModalMessage(`Минимальное количество символов в тексте: ${textMinLength}`));

	let textRequestReferences: Array<string> | null = text.match(requestRegExp);
	const requestTextReplaces: RequestTextReplace[] = [];
	if (textRequestReferences) {
		textRequestReferences = uniqueValues(textRequestReferences);
		for (const textRequestReference of textRequestReferences) {
			const requestIdPart = textRequestReference.match(/\|\d{1,3}\|/);
			if (!requestIdPart) return dispatch(displayModalMessage(`Ошибка в запросе ${textRequestReference}`));
			const requestId = +requestIdPart[0].substring(1, requestIdPart[0].length - 1);
			const textRequest = requestsState.requests.find((request) => request.id === requestId);
			if (!textRequest) return dispatch(displayModalMessage(`Запроса ${textRequestReference} не существует`));
			requestTextReplaces.push({
				textRequestReference: textRequestReference,
				request: textRequest
			});
		}
	}

	const reviewRequests = reviewState.requests;
	const chosenMainRequestId = reviewState.chosenRequestId;
	const mainRequest = reviewRequests.find((request) => request.id === chosenMainRequestId);
	if (!mainRequest) throw new Error('Основной запрос с таким id не существует.');

	dispatch(displayModalMessage({paragraphs: ['Выполняется основной запрос'], header: 'Ждите', closable: false}));
	if (isReview) {
		const reviewOpinion = reviewState.reviewOpinion;
		const review: Review | undefined = await requestToReview(mainRequest, text, reviewOpinion);
		if (!review) return dispatch(displayModalMessage('Ни одной позиции для основного запроса не нашлось'));

		if (requestTextReplaces.length > 0) {
			const newText: string | null = await getTextWithPositions(text, requestTextReplaces, dispatch);
			if (!newText) return;
			review.text = newText;
		}

		dispatch(displayModalMessage({paragraphs: ['Выполняется отправка отзыва'], header: 'Ждите', closable: false}));
		await delay(3000);
		const reviewAnswer = await reviewsService.sendReview(review);
		if (!reviewAnswer) return dispatch(displayModalMessage('Произошла ошибка при отправке отзыва'));
		dispatch(displayModalMessage());
		window.open(
			`https://shikimori.one/${reviewAnswer.anime_id ? 'animes' : 'mangas'}/${reviewAnswer.anime_id ?? reviewAnswer.manga_id}/reviews/${reviewAnswer.id}`,
			'_blank')?.focus();
	} else {
		const isOffTopic = reviewState.isOffTopic;
		const comment: Comment | undefined = await requestToComment(mainRequest, text, isOffTopic);
		if (!comment) return dispatch(displayModalMessage('Ни одной позиции для основного запроса не нашлось'));

		if (requestTextReplaces.length > 0) {
			const newText: string | null = await getTextWithPositions(text, requestTextReplaces, dispatch);
			if (!newText) return;
			comment.text = newText;
		}

		dispatch(displayModalMessage({paragraphs: ['Выполняется отправка коммента'], header: 'Ждите', closable: false}));
		await delay(3000);
		const commentAnswer = await commentsService.sendComment(comment);
		if (!commentAnswer) return dispatch(displayModalMessage('Произошла ошибка при отправке отзыва'));
		dispatch(displayModalMessage());
		window.open(
			`https://shikimori.one/forum/${commentAnswer.commentable_id}`,
			'_blank')?.focus();
	}
};

const getTextWithPositions = async (text: string, requestTextReplaces: RequestTextReplace[], dispatch: ThunkDispatch<RootState, unknown, RootAction>): Promise<string | null> => {
	for (let i = 0; i < requestTextReplaces.length; i++) {
		dispatch(displayModalMessage({paragraphs: [`Выполняется текстовый запрос (${i+1}/${requestTextReplaces.length})`], header: 'Ждите', closable: false}));
		await delay(3000);
		const textLink = await requestToTextLink(requestTextReplaces[i].request);
		if (!textLink) {
			dispatch(displayModalMessage(`Ни одной позиции для запроса ${requestTextReplaces[i].textRequestReference} не нашлось`));
			return null;
		}
		text = text.replaceAll(requestTextReplaces[i].textRequestReference, textLink);
	}
	return text;
};
