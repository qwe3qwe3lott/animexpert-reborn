import {Request} from '../../../types/Request';

export enum ReviewActionTypes {
	CHANGE_REQUEST_NUMBER_PARAM_VALUE = 'CHANGE_REQUEST_NUMBER_PARAM_VALUE'
}
type ChangeRequestParamValueAction = {
	type: ReviewActionTypes.CHANGE_REQUEST_NUMBER_PARAM_VALUE,
	payload: {
		requestId: number
		paramName: string
		value: number
	}
};
export type ReviewAction = ChangeRequestParamValueAction
export type ReviewState = {
	mainRequests: Request[]
	textRequests: Request[]
}
