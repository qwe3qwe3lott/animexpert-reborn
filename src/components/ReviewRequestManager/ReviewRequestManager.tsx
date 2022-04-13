import React, {useMemo} from 'react';
import {Dispatch} from 'redux';
import {ReviewAction, ReviewActionTypes} from '../../store/reducers/review/types';
import {useDispatch} from 'react-redux';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import RequestSettings from '../RequestSettings';
import {Request} from '../../types/Request';

import styles from './ReviewRequestManager.module.scss';

type Props = {
	className?: string
}

const ReviewRequestManager: React.FC<Props> = ({className}) => {
	console.log('ReviewRequestManager', 'render');
	const reviewDispatch: Dispatch<ReviewAction> = useDispatch();

	const requests = useTypedSelector((state) => state.review.requests);
	const chosenRequestId = useTypedSelector((state) => state.review.chosenRequestId);

	const request: Request = useMemo(() => {
		const request = requests.find((request) => request.id === chosenRequestId);
		if (!request) throw new Error('Нет основного запроса с таким id для японской рулетки');
		return request;
	}, [chosenRequestId]);

	return (<div className={[className, styles.layout].join(' ')}>
		<h2 className={styles.title}>Настройка основного запроса</h2>
		<p className={styles.subTitle}>отвечает за тайтл, под который будет написан обзор</p>
		<label className={styles.labelToLeft}>
			Написать под
			<select
				onChange={(event) => reviewDispatch({type: ReviewActionTypes.SET_CHOSEN_REQUEST_ID, payload: +event.target.value})} className={styles.select}
			>
				{requests.map((request, key) =>
					<option key={key} value={request.id}>{request.label}</option>,
				)}
			</select>
		</label>
		<RequestSettings
			request={request}
			onChange={(event) => reviewDispatch({type: ReviewActionTypes.CHANGE_REQUEST_PARAM_VALUE, payload: event})}
		/>
	</div>);
};

export default ReviewRequestManager;
