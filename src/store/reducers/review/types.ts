import {Request} from '../../../types/Request';
import {RequestParamTypes} from '../../../types/RequestParam';

export enum ReviewActionTypes {
	CHANGE_REQUEST_NUMBER_PARAM_VALUE = 'CHANGE_REQUEST_NUMBER_PARAM_VALUE'
}
type ChangeRequestParamValueReviewActionBasicPayload = {
	requestId: number
	paramName: string
}
type ChangeRequestParamValueReviewActionNumberPayload = ChangeRequestParamValueReviewActionBasicPayload & {
	type: RequestParamTypes.Number,
	value: number
}
type ChangeRequestParamValueReviewActionSinglePayload = ChangeRequestParamValueReviewActionBasicPayload & {
	type: RequestParamTypes.Single,
	value: string
}
type ChangeRequestParamValueReviewActionMultiplePayload = ChangeRequestParamValueReviewActionBasicPayload & {
	type: RequestParamTypes.Multiple,
	value: {
		valueOfValues: string,
		flag: boolean
	}
}
type ChangeRequestParamValueReviewActionPayload = ChangeRequestParamValueReviewActionNumberPayload | ChangeRequestParamValueReviewActionSinglePayload | ChangeRequestParamValueReviewActionMultiplePayload
export type ChangeRequestParamValueReviewAction = {
	type: ReviewActionTypes.CHANGE_REQUEST_NUMBER_PARAM_VALUE,
	payload: ChangeRequestParamValueReviewActionPayload
};
export type ReviewAction = ChangeRequestParamValueReviewAction
export type ReviewState = {
	mainRequests: Request[]
	textRequests: Request[]
}
