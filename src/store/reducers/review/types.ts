import {Request} from '../../../types/Request';
import {RequestChangeEvent} from '../../../components/RequestSettings/events';

export enum ReviewActionTypes {
	CHANGE_REQUEST_PARAM_VALUE = 'CHANGE_REQUEST_PARAM_VALUE',
	CHANGE_CHOSEN_TEXT_REQUEST_ID = 'CHANGE_CHOSEN_TEXT_REQUEST_ID',
	CHANGE_CHOSEN_MAIN_REQUEST_ID = 'CHANGE_CHOSEN_MAIN_REQUEST_ID'
}
export type ChangeRequestParamValueReviewAction = {
	type: ReviewActionTypes.CHANGE_REQUEST_PARAM_VALUE,
	payload: RequestChangeEvent
};
export type ChangeChosenTextRequestIdReviewAction = {
	type: ReviewActionTypes.CHANGE_CHOSEN_TEXT_REQUEST_ID
	payload: number
}
export type ChangeChosenMainRequestIdReviewAction = {
	type: ReviewActionTypes.CHANGE_CHOSEN_MAIN_REQUEST_ID
	payload: number
}
export type ReviewAction = ChangeRequestParamValueReviewAction | ChangeChosenTextRequestIdReviewAction | ChangeChosenMainRequestIdReviewAction
export type ReviewState = {
	chosenTextRequestId: number | null
	chosenMainRequestId: number
	mainRequests: Request[]
	textRequests: Request[]
}
