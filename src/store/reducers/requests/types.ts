import {Request, RequestTypes} from '../../../types/Request';
import {RequestChangeEvent} from '../../../types/RequestChangeEvent';

export enum RequestsActionTypes {
	CHANGE_REQUEST_PARAM_VALUE = 'CHANGE_REQUEST_PARAM_VALUE',
	CREATE_REQUEST = 'CREATE_REQUEST',
	DELETE_REQUEST = 'DELETE_REQUEST',
	CHANGE_REQUEST_LABEL = 'CHANGE_REQUEST_LABEL',
	SET_CHOSEN_REQUEST_ID = 'SET_CHOSEN_REQUEST_ID',
	SET_REQUESTS = 'SET_REQUESTS'
}
export type ChangeRequestParamValueRequestsAction = {
	type: RequestsActionTypes.CHANGE_REQUEST_PARAM_VALUE,
	payload: RequestChangeEvent
};
export type CreateRequestRequestsAction = {
	type: RequestsActionTypes.CREATE_REQUEST
	payload: RequestTypes
}
export type DeleteRequestRequestsAction = {
	type: RequestsActionTypes.DELETE_REQUEST
	payload: number
}
export type ChangeRequestLabelRequestsAction = {
	type: RequestsActionTypes.CHANGE_REQUEST_LABEL
	payload: {
		requestId: number
		requestLabel: string
	}
}
export type SetChosenRequestIdRequestsAction = {
	type: RequestsActionTypes.SET_CHOSEN_REQUEST_ID,
	payload: number | null
}
export type SetRequestsRequestsAction = {
	type: RequestsActionTypes.SET_REQUESTS,
	payload: Request[]
}
export type RequestsAction = ChangeRequestParamValueRequestsAction | CreateRequestRequestsAction |
	DeleteRequestRequestsAction | ChangeRequestLabelRequestsAction | SetChosenRequestIdRequestsAction |
	SetRequestsRequestsAction
export type RequestsState = {
	requests: Request[],
	chosenRequestId: number | null
}
