import React, {FormEvent} from 'react';
import {ReviewActionTypes} from '../../store/reducers/review/types';
import {useDispatch} from 'react-redux';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {executeReview} from '../../store/actions/executeReview';

import styles from './ReviewForm.module.scss';
import TextAreaWithContex from '../TextAreaWithContex';
import ReviewFormSubmit from '../ReviewFormSubmit';
import {RootThunkDispatch} from '../../store/reducers';

type Props = {
	className?: string
}

const ReviewForm: React.FC<Props> = ({className}) => {
	console.log('ReviewForm', 'render');
	const dispatch: RootThunkDispatch = useDispatch();
	const reviewText = useTypedSelector((state) => state.review.reviewText);
	const sendHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		await dispatch(executeReview());
	};

	return (<form onSubmit={sendHandler} className={[className, styles.form].join(' ')}>
		<TextAreaWithContex
			className={styles.reviewArea}
			text={reviewText}
			onChange={(text) => dispatch({type: ReviewActionTypes.SET_REVIEW_TEXT, payload: text})}
		/>
		<ReviewFormSubmit/>
	</form>);
};

export default ReviewForm;
