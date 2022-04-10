import {Review, ReviewOpinions, ReviewTypes} from '../../types/Review';
import {displayModalMessage} from '../../util/displayModalMessage';
import {Request, RequestTypes} from '../../types/Request';
import {infoService} from '../../api/InfoService';
import {randomElement} from '../../util/randomElement';
import {reviewsService} from '../../api/ReviewsService';
import {store} from '../../store';
import {delay} from '../../util/delay';

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

const requestToReview = async (request: Request, reviewText: string, reviewOpinion: ReviewOpinions): Promise<Review | undefined> => {
	const positions = await infoService.getPositions(request);
	if (positions.length === 0) return;
	const position = randomElement(positions);
	return {
		type: requestTypeToReviewType(request.type),
		text: reviewText,
		opinion: reviewOpinion,
		targetId: position.id,
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

export const executeReview = async (reviewOpinion: ReviewOpinions): Promise<void> => {
	const reviewState = store.getState().review;
	let reviewText = reviewState.reviewText;
	const reviewMinLength = 300;
	if (reviewText.length < reviewMinLength) return displayModalMessage(`Минимальное количество символов в тексте: ${reviewMinLength}`);

	let textRequestReferences: Array<string> | null = reviewText.match(/@(Anime|Manga|Ranobe)\|\d{1,3}\|[а-яА-Яa-zA-Z0-1 ]{0,30};/g);
	const requestTextReplaces: RequestTextReplace[] = [];
	if (textRequestReferences) {
		textRequestReferences = Array.from(new Set(textRequestReferences));
		for (const textRequestReference of textRequestReferences) {
			const requestIdPart = textRequestReference.match(/\|\d{1,3}\|/);
			if (!requestIdPart) return displayModalMessage(`Ошибка в запросе ${textRequestReference}`);
			const requestId = +requestIdPart[0].substring(1, requestIdPart[0].length - 1);
			const textRequest = reviewState.textRequests.find((review) => review.id === requestId);
			if (!textRequest) return displayModalMessage(`Запроса ${textRequestReference} не существует`);
			requestTextReplaces.push({
				textRequestReference: textRequestReference,
				request: textRequest,
			});
		}
	}

	const mainRequests = reviewState.mainRequests;
	const chosenMainRequestId = reviewState.chosenMainRequestId;
	const mainRequest = mainRequests.find((request) => request.id === chosenMainRequestId);
	if (mainRequest === undefined) throw new Error('Основной запрос с таким id не существует.');

	displayModalMessage({paragraphs: ['Выполняется основной запрос'], header: 'Ждите', closable: false});
	const review: Review | undefined = await requestToReview(mainRequest, reviewText, reviewOpinion);
	if (!review) return displayModalMessage('Ни одной позиции для основного запроса не нашлось');

	if (requestTextReplaces.length > 0) {
		for (let i = 0; i < requestTextReplaces.length; i++) {
			displayModalMessage({paragraphs: [`Выполняется текстовый запрос (${i+1}/${requestTextReplaces.length})`], header: 'Ждите', closable: false});
			await delay(3000);
			const textLink = await requestToTextLink(requestTextReplaces[i].request);
			if (!textLink) return displayModalMessage(`Ни одной позиции для запроса ${requestTextReplaces[i].textRequestReference} не нашлось`);
			reviewText = reviewText.replaceAll(requestTextReplaces[i].textRequestReference, textLink);
		}
		review.text = reviewText;
	}

	displayModalMessage({paragraphs: ['Выполняется отправка коммента'], header: 'Ждите', closable: false});
	await delay(3000);
	const reviewAnswer = await reviewsService.sendReview(review);
	if (!reviewAnswer) return displayModalMessage('Произошла ошибка при отправке отзыва');
	displayModalMessage();
	window.open(
		`https://shikimori.one/${reviewAnswer.anime_id ? 'animes' : 'mangas'}/${reviewAnswer.anime_id ?? reviewAnswer.manga_id}/reviews/${reviewAnswer.id}`,
		'_blank')?.focus();
};
