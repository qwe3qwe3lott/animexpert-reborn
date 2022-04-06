import React, {useMemo, KeyboardEvent, useState, FormEvent} from 'react';
import ReviewRequestManager from '../../components/ReviewRequestManager';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {infoService} from '../../api/InfoService';
import {RequestTypes} from '../../types/Request';
import {Dispatch} from 'redux';
import {ReviewAction, ReviewActionTypes} from '../../store/reducers/review/types';
import {useDispatch} from 'react-redux';
import ModalWindow from '../../components/ModalWindow';
import {randomElement} from '../../util/randomElement';
import {commentsService} from '../../api/CommentsService';

const ReviewToolPage: React.FC = () => {
	const reviewDispatch: Dispatch<ReviewAction> = useDispatch();
	const {chosenMainRequestId, mainRequests, reviewText} = useTypedSelector((state) => state.review);
	const mainRequest = useMemo(() => {
		const mainRequest = mainRequests.find((request) => request.id === chosenMainRequestId);
		if (mainRequest === undefined) throw new Error('Основной запрос с таким id не существует.');
		return mainRequest;
	}, [chosenMainRequestId]);
	const sendHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		switch (mainRequest.requestType) {
		case RequestTypes.Anime:
			const animes = await infoService.getAnimes(mainRequest);
			const anime = randomElement(animes);
			console.log(anime);
			await commentsService.sendReview(anime.id, reviewText, 'neutral');
		}
	};
	const [isTextRequestChoosing, setTextRequestChoosing] = useState(false);

	const textAreaKeyDownHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key !== '@') return;
		setTextRequestChoosing(true);
	};

	return (<div>
		{isTextRequestChoosing && <ModalWindow onClose={() => setTextRequestChoosing(false)}>
			{reviewText}
		</ModalWindow>}
		<ReviewRequestManager/>
		<form onSubmit={sendHandler}>
			<textarea
				minLength={230}
				value={reviewText}
				onChange={(event) => reviewDispatch({type: ReviewActionTypes.SET_REVIEW_TEXT, payload: event.target.value})}
				onKeyDown={textAreaKeyDownHandler}
			/>
			<input type={'submit'} value={'Отправить'}/>
		</form>
	</div>);
};

export default ReviewToolPage;
