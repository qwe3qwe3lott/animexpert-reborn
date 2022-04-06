import React, {useMemo, useState} from 'react';
import {Dispatch} from 'redux';
import {ReviewAction, ReviewActionTypes} from '../../store/reducers/review/types';
import {useDispatch} from 'react-redux';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import RequestSettings from '../RequestSettings';
import {Request} from '../../types/Request';
import RequestList from '../RequestList';

const ReviewRequestManager: React.FC = () => {
	const reviewDispatch: Dispatch<ReviewAction> = useDispatch();

	const {mainRequests, chosenMainRequestId, chosenTextRequestId, textRequests} = useTypedSelector((state) => state.review);

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
	const isTextRequestSettingsMode = useMemo(() => !isRequestListMode && chosenTextRequestId !== null, [chosenTextRequestId]);
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

	return (<div>
		{isMainRequestSettingsMode && <h2>Настройка основного запроса</h2>}
		{isTextRequestSettingsMode && <h2>Настройка запроса в тексте</h2>}
		{isRequestListMode && <h2>Список запросов в тексте</h2>}
		{isMainRequestSettingsMode && <select onChange={mainRequestChangeHandler}>
			{mainRequests.map((mainRequest, key) =>
				<option key={key} value={mainRequest.id}>{mainRequest.label}</option>,
			)}
		</select>}
		{!isRequestListMode && <button onClick={() => changeRequestListMode(true)}>
			К Списку запросов
		</button>}
		{!isMainRequestSettingsMode && <button onClick={toMainRequestSettings}>
			К основному запросу
		</button>}
		{mainTool}
	</div>);
};

export default ReviewRequestManager;
