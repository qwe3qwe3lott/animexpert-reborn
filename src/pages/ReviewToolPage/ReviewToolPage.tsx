import React, {FormEvent, KeyboardEvent, MutableRefObject, useRef, useState} from 'react';
import ReviewRequestManager from '../../components/ReviewRequestManager';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {Dispatch} from 'redux';
import {ReviewAction, ReviewActionTypes} from '../../store/reducers/review/types';
import {useDispatch} from 'react-redux';
import ModalWindow from '../../components/ModalWindow';
import {ReviewOpinions} from '../../types/Review';
import {interpreter} from '../../util/interpreter';

import styles from './ReviewToolPage.module.scss';
import {executeReview} from './executeReview';
import {Request} from '../../types/Request';

const ReviewToolPage: React.FC = () => {
	const reviewDispatch: Dispatch<ReviewAction> = useDispatch();
	const {reviewText, textRequests} = useTypedSelector((state) => state.review);
	const sendHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		await executeReview(reviewOpinion);
	};
	const [isTextRequestChoosing, setTextRequestChoosingFlag] = useState(false);

	const [textAreaSelection, setTextAreaSelection] = useState({start: 0, end: 0});

	const textAreaRef: MutableRefObject<HTMLTextAreaElement | null> = useRef(null);

	const textAreaKeyDownHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key !== '@') return;
		event.preventDefault();
		const textArea: HTMLTextAreaElement = event.target as HTMLTextAreaElement;
		setTextAreaSelection({start: textArea.selectionStart, end: textArea.selectionEnd});
		setTextRequestChoosingFlag(true);
	};

	const textRequestSelectHandler = (request: Request | string) => {
		const newPart = (typeof request === 'string') ? request : `@${request.type}|${request.id}|${request.label};`;
		const newReview = `${reviewText.substring(0, textAreaSelection.start)}${newPart}${reviewText.substring(textAreaSelection.end, reviewText.length)}`;
		reviewDispatch({type: ReviewActionTypes.SET_REVIEW_TEXT, payload: newReview});
		setTextRequestChoosingFlag(false);
		const textArea = textAreaRef.current;
		if (textArea) {
			textArea.focus();
			const index = textAreaSelection.start + newPart.length;
			setTimeout(function() {
				textArea.setSelectionRange(index, index);
			}, 0);
		}
	};

	const [reviewOpinion, changeReviewOpinion] = useState(ReviewOpinions.neutral);

	return (<section className={styles.section}>
		{isTextRequestChoosing && <ModalWindow header={'Выберите запрос'} onClose={() => setTextRequestChoosingFlag(false)}>
			<ul className={styles.list}>
				<li><button className={styles.button} onClick={() => textRequestSelectHandler('@')}>@</button></li>
				{textRequests.map((textRequest, key) => <li key={key}>
					<button className={styles.button} onClick={() => textRequestSelectHandler(textRequest)}>{textRequest.label}</button>
				</li>)}
			</ul>
		</ModalWindow>}
		<ReviewRequestManager className={styles.manager}/>
		<form onSubmit={sendHandler} className={styles.form}>
			<textarea
				ref={textAreaRef}
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
