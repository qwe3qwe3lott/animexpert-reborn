import React, {useMemo, useState} from 'react';
import {Dispatch} from 'redux';
import {ReviewAction, ReviewActionTypes} from '../../store/reducers/review/types';
import {useDispatch} from 'react-redux';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import RequestSettings from '../RequestSettings';
import {Request} from '../../types/Request';
import RequestList from '../RequestList';

import styles from './ReviewRequestManager.module.scss';

type Props = {
	className?: string
}

const ReviewRequestManager: React.FC<Props> = ({className}) => {
	console.log('ReviewRequestManager', 'render');
	const reviewDispatch: Dispatch<ReviewAction> = useDispatch();

	const mainRequests = useTypedSelector((state) => state.review.mainRequests);
	const textRequests = useTypedSelector((state) => state.review.textRequests);
	const chosenMainRequestId = useTypedSelector((state) => state.review.chosenMainRequestId);
	const chosenTextRequestId = useTypedSelector((state) => state.review.chosenTextRequestId);

	const mainRequestChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) =>
		reviewDispatch({type: ReviewActionTypes.SET_CHOSEN_MAIN_REQUEST_ID, payload: +event.target.value});

	const displayedRequest = useMemo((): Request => {
		if (chosenTextRequestId === null) {
			const mainRequest = mainRequests.find((request) => request.id === chosenMainRequestId);
			if (mainRequest === undefined) throw new Error('Основной запрос с таким id не существует.');
			return mainRequest;
		}
		const textRequest = textRequests.find((request) => request.id === chosenTextRequestId);
		if (textRequest === undefined) throw new Error('Запроса в тексте с таким id не существует.');
		return textRequest;
	}, [chosenMainRequestId, chosenTextRequestId]);

	const [isRequestListMode, changeRequestListMode] = useState(false);
	const isTextRequestSettingsMode = useMemo(() => !isRequestListMode && chosenTextRequestId !== null, [chosenTextRequestId, isRequestListMode]);
	const isMainRequestSettingsMode = useMemo(() => !isRequestListMode && !isTextRequestSettingsMode, [isRequestListMode, isTextRequestSettingsMode]);

	const toMainRequestSettings = () => {
		reviewDispatch({type: ReviewActionTypes.SET_CHOSEN_TEXT_REQUEST_ID, payload: null});
		changeRequestListMode(false);
	};

	const mainTool = isRequestListMode ?
		<RequestList
			requests={textRequests}
			onCreate={(requestType) =>
				reviewDispatch({type: ReviewActionTypes.CREATE_TEXT_REQUEST, payload: requestType})}
			onEdit={(requestId) => {
				changeRequestListMode(false);
				reviewDispatch({type: ReviewActionTypes.SET_CHOSEN_TEXT_REQUEST_ID, payload: requestId});
			}}
			onDelete={(requestId) =>
				reviewDispatch({type: ReviewActionTypes.DELETE_TEXT_REQUEST, payload: requestId})}
			onLabelChange={(requestId, requestLabel) =>
				reviewDispatch({type: ReviewActionTypes.CHANGE_TEXT_REQUEST_LABEL, payload: {requestId, requestLabel}})}
		/> :
		<RequestSettings
			request={displayedRequest}
			onChange={(event) =>
				reviewDispatch({type: ReviewActionTypes.CHANGE_REQUEST_PARAM_VALUE, payload: event})}
		/>;

	return (<div className={[className, styles.layout].join(' ')}>
		{isMainRequestSettingsMode && <h2 className={styles.title}>Настройка основного запроса</h2>}
		{isTextRequestSettingsMode && <>
			<h2 className={styles.title}>Настройка запроса в тексте</h2>
			<p className={styles.subTitle}>Запрос: &quot;{displayedRequest.label}&quot;</p>
		</>}
		{isRequestListMode && <h2 className={styles.title}>Список запросов в тексте</h2>}
		{isMainRequestSettingsMode && <label className={styles.labelToLeft}>
			Написать под
			<select onChange={mainRequestChangeHandler} className={styles.select}>
				{mainRequests.map((mainRequest, key) =>
					<option key={key} value={mainRequest.id}>{mainRequest.label}</option>,
				)}
			</select>
		</label>}
		{!isMainRequestSettingsMode && <button className={styles.button} onClick={toMainRequestSettings}>
			К основному запросу
		</button>}
		{!isRequestListMode && <button className={styles.button} onClick={() => changeRequestListMode(true)}>
			К cписку запросов
		</button>}
		{mainTool}
	</div>);
};

export default ReviewRequestManager;
