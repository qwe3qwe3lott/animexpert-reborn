import React from 'react';
import styles from './ReviewFormSubmit.module.scss';
import {ReviewOpinions} from '../../types/Review';
import {interpreter} from '../../util/interpreter';
import {Dispatch} from 'redux';
import {ReviewAction, ReviewActionTypes} from '../../store/reducers/review/types';
import {useDispatch} from 'react-redux';
import {useTypedSelector} from '../../hooks/useTypedSelector';

const ReviewFormSubmit: React.FC = () => {
	const reviewDispatch: Dispatch<ReviewAction> = useDispatch();
	const reviewOpinion = useTypedSelector((state) => state.review.reviewOpinion);
	const isReview = useTypedSelector((state) => state.review.isReview);
	const isOffTopic = useTypedSelector((state) => state.review.isOffTopic);

	return (<>
		<label className={styles.labelToRight}>
			<input
				className={styles.checkbox}
				type={'checkbox'}
				checked={isReview}
				onChange={(event) => reviewDispatch({type: ReviewActionTypes.SET_REVIEW_FLAG, payload: event.target.checked})}
			/>
			это отзыв, а не комментарий
		</label>
		{isReview && <label className={styles.labelToLeft}>
			Этот отзыв:
			<select
				className={styles.select}
				value={reviewOpinion}
				onChange={(event) => reviewDispatch({type: ReviewActionTypes.SET_REVIEW_OPINION, payload: event.target.value as ReviewOpinions})}
			>
				{Object.values(ReviewOpinions).map((value, key) => <option key={key} value={value}>
					{interpreter.interpretReviewOpinions(value)}
				</option>)}
			</select>
		</label>}
		{!isReview && <label className={styles.labelToRight}>
			<input
				className={styles.checkbox}
				type={'checkbox'}
				checked={isOffTopic}
				onChange={(event) => reviewDispatch({type: ReviewActionTypes.SET_OFF_TOPIC_FLAG, payload: event.target.checked})}
			/>
			это офтоп
		</label>}
		<input className={styles.button} type={'submit'} value={'Отправить'}/>
	</>);
};

export default ReviewFormSubmit;
