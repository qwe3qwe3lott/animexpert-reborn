import React, {FormEvent, KeyboardEvent, MutableRefObject, useRef, useState} from 'react';
import {ReviewAction, ReviewActionTypes} from '../../store/reducers/review/types';
import {ReviewOpinions} from '../../types/Review';
import {interpreter} from '../../util/interpreter';
import {Dispatch} from 'redux';
import {useDispatch} from 'react-redux';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {executeReview} from '../../pages/ReviewToolPage/executeReview';
import {Request} from '../../types/Request';

import styles from './ReviewForm.module.scss';
import ListDisplayer from '../ListDisplayer';
import {ModalList} from '../../types/ModalList';
import {store} from '../../store';

type Props = {
	className?: string
}

const ReviewForm: React.FC<Props> = ({className}) => {
	console.log('ReviewForm', 'render');
	const reviewDispatch: Dispatch<ReviewAction> = useDispatch();
	const reviewText = useTypedSelector((state) => state.review.reviewText);
	const sendHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		await executeReview(reviewOpinion);
	};
	const [isTextRequestChoosing, setTextRequestChoosingFlag] = useState(false);

	const textAreaRef: MutableRefObject<HTMLTextAreaElement | null> = useRef(null);

	const [textRequestsList, setTextRequestsList] = useState<ModalList>([]);

	const textAreaKeyDownHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		switch (event.key) {
		case '@':
			event.preventDefault();

			const textArea: HTMLTextAreaElement = event.target as HTMLTextAreaElement;
			const textAreaSelection = {start: textArea.selectionStart, end: textArea.selectionEnd};

			const textRequestsList: ModalList = [{label: 'Символ @', action: () => textRequestSelectHandler('@', textAreaSelection)}];
			for (const textRequest of store.getState().requests.requests) {
				textRequestsList.push({label: textRequest.label, action: () => textRequestSelectHandler(textRequest, textAreaSelection)});
			}
			setTextRequestsList(textRequestsList);

			setTextRequestChoosingFlag(true);
		}
	};

	const textRequestSelectHandler = (request: Request | string, textAreaSelection: {start: number, end: number}) => {
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

	return (<>
		{isTextRequestChoosing && <ListDisplayer modalList={textRequestsList} header={'Выберите запрос'} onClose={() => setTextRequestChoosingFlag(false)}/>}
		<form onSubmit={sendHandler} className={[className, styles.form].join(' ')}>
			<textarea
				placeholder={'Для использования текстовых запросов введите символ @. Текстовые запросы создаются в списке запросов.'}
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
	</>);
};

export default ReviewForm;
