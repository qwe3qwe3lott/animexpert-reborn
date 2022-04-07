import React, {FormEvent, KeyboardEvent, useMemo, useState} from 'react';
import ReviewRequestManager from '../../components/ReviewRequestManager';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {infoService} from '../../api/InfoService';
import {RequestTypes} from '../../types/Request';
import {Dispatch} from 'redux';
import {ReviewAction, ReviewActionTypes} from '../../store/reducers/review/types';
import {useDispatch} from 'react-redux';
import ModalWindow from '../../components/ModalWindow';
import {randomElement} from '../../util/randomElement';
import {reviewsService} from '../../api/ReviewsService';
import {useMessageDisplayer} from '../../hooks/useMessageDisplayer';
import {AnimeReview, ReviewOpinions, ReviewTypes} from '../../types/Review';
import {interpreter} from '../../util/interpreter';

import styles from './ReviewToolPage.module.scss';

const ReviewToolPage: React.FC = () => {
	const reviewDispatch: Dispatch<ReviewAction> = useDispatch();
	const {chosenMainRequestId, mainRequests, reviewText, textRequests} = useTypedSelector((state) => state.review);
	const mainRequest = useMemo(() => {
		const mainRequest = mainRequests.find((request) => request.id === chosenMainRequestId);
		if (mainRequest === undefined) throw new Error('Основной запрос с таким id не существует.');
		return mainRequest;
	}, [chosenMainRequestId]);
	const sendHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (reviewText.length < 250) return useMessageDisplayer('Минимальное количество символов в тексте: 250');
		switch (mainRequest.requestType) {
		case RequestTypes.Anime:
			const animes = await infoService.getAnimes(mainRequest);
			if (animes.length === 0) return useMessageDisplayer('Ни одно аниме для основного запроса не нашлось');
			const anime = randomElement(animes);
			const animeReview: AnimeReview = {
				type: ReviewTypes.Anime,
				targetId: anime.id,
				text: reviewText,
				opinion: reviewOpinion,
			};
			await reviewsService.sendReview(animeReview);
		}
	};
	const [isTextRequestChoosing, setTextRequestChoosing] = useState(false);

	const textAreaKeyDownHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key !== '@') return;
		setTextRequestChoosing(true);
	};

	const [reviewOpinion, changeReviewOpinion] = useState(ReviewOpinions.neutral);

	return (<section className={styles.section}>
		{isTextRequestChoosing && <ModalWindow onClose={() => setTextRequestChoosing(false)}>
			<ul>
				{textRequests.map((textRequest, key) => <li key={key}>
					{textRequest.label}
				</li>)}
			</ul>
		</ModalWindow>}
		<ReviewRequestManager className={styles.manager}/>
		<form onSubmit={sendHandler} className={styles.form}>
			<textarea
				className={styles.reviewArea}
				minLength={250}
				value={reviewText}
				onChange={(event) => reviewDispatch({type: ReviewActionTypes.SET_REVIEW_TEXT, payload: event.target.value})}
				onKeyDown={textAreaKeyDownHandler}
			/>
			<label className={styles.labelToLeft}>
				Этот отзыв:
				<select className={styles.select} value={reviewOpinion} onChange={(event) => changeReviewOpinion(event.target.value as ReviewOpinions)}>
					{Object.values(ReviewOpinions).map((value, key) => <option key={key} value={value}>
						{interpreter.interpretReviewOpinions(value)}
					</option>)}
				</select>
			</label>
			<input className={styles.button} type={'submit'} value={'Отправить'}/>
		</form>
	</section>);
};

export default ReviewToolPage;
