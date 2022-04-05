import React, {useMemo} from 'react';
import {Dispatch} from 'redux';
import {
	ReviewAction,
	ReviewActionTypes,
} from '../../store/reducers/review/types';
import {useDispatch} from 'react-redux';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import RequestSettings from '../RequestSettings';
import {Request} from '../../types/Request';
import {RequestChangeEvent} from '../RequestSettings/events';

const ReviewRequestManager: React.FC = () => {
	const reviewDispatch: Dispatch<ReviewAction> = useDispatch();

	const {mainRequests, chosenMainRequestId, chosenTextRequestId, textRequests} = useTypedSelector((state) => state.review);

	const requestSettingsChangeHandler = (event: RequestChangeEvent) => {
		reviewDispatch({type: ReviewActionTypes.CHANGE_REQUEST_PARAM_VALUE, payload: event});
	};
	const mainRequestChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
		reviewDispatch({type: ReviewActionTypes.CHANGE_CHOSEN_MAIN_REQUEST_ID, payload: +event.target.value});
	};
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

	return (<div>
		<select onChange={mainRequestChangeHandler}>
			{mainRequests.map((mainRequest, key) =>
				<option key={key} value={mainRequest.id}>{mainRequest.label}</option>,
			)}
		</select>
		<RequestSettings request={displayedRequest} onChange={requestSettingsChangeHandler}/>
	</div>);
};

export default ReviewRequestManager;
