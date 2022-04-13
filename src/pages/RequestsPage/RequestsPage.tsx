import React, {useMemo} from 'react';

import styles from './RequestsPage.module.scss';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import RequestSettings from '../../components/RequestSettings';
import RequestList from '../../components/RequestList';
import {Request} from '../../types/Request';
import {RequestsAction, RequestsActionTypes} from '../../store/reducers/requests/types';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'redux';

const RequestsPage: React.FC = () => {
	console.log('RequestsPage', 'render');
	const requestsDispatch: Dispatch<RequestsAction> = useDispatch();
	const {requests, chosenRequestId} = useTypedSelector((state) => state.requests);

	const request: Request | null = useMemo(() => {
		return requests.find((request) => request.id === chosenRequestId) || null;
	}, [chosenRequestId]);

	return (<section className={styles.section}>
		{request ?
			<div className={styles.columnContainer}>
				<h2 className={styles.title}>Настройка запроса</h2>
				<p className={styles.subTitle}>Запрос: &quot;{request.label}&quot;</p>
				<button
					className={styles.button}
					onClick={() => requestsDispatch({type: RequestsActionTypes.SET_CHOSEN_REQUEST_ID, payload: null})}
				>К списку запросов</button>
				<RequestSettings
					request={request}
					onChange={(event) => requestsDispatch({type: RequestsActionTypes.CHANGE_REQUEST_PARAM_VALUE, payload: event})}
				/>
			</div> :
			<div className={styles.columnContainer}>
				<h2 className={styles.title}>Список запросов</h2>
				<p className={styles.subTitle}>Создайте запрос, выбрав тип и настроив его</p>
				<RequestList
					requests={requests}
					onCreate={(requestType) => requestsDispatch({type: RequestsActionTypes.CREATE_REQUEST, payload: requestType})}
					onEdit={(requestId) => requestsDispatch({type: RequestsActionTypes.SET_CHOSEN_REQUEST_ID, payload: requestId})}
					onDelete={(requestId) => requestsDispatch({type: RequestsActionTypes.DELETE_REQUEST, payload: requestId})}
					onLabelChange={(requestId, requestLabel) => requestsDispatch({type: RequestsActionTypes.CHANGE_REQUEST_LABEL, payload: {requestId, requestLabel}})}
				/>
			</div>
		}
	</section>);
};

export default RequestsPage;
