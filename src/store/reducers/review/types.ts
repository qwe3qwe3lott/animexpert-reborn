import {Request} from '../../../types/Request';
import {RequestChangeEvent} from '../../../components/RequestSettings/events';

export enum ReviewActionTypes {
	CHANGE_REQUEST_PARAM_VALUE = 'CHANGE_REQUEST_PARAM_VALUE',
	SET_CHOSEN_REQUEST_ID = 'SET_CHOSEN_REQUEST_ID',
	SET_REVIEW_TEXT = 'SET_REVIEW_TEXT'
}
export type ChangeRequestParamValueReviewAction = {
	type: ReviewActionTypes.CHANGE_REQUEST_PARAM_VALUE,
	payload: RequestChangeEvent
};
export type ChangeChosenRequestIdReviewAction = {
	type: ReviewActionTypes.SET_CHOSEN_REQUEST_ID
	payload: number
}

export type SetReviewTextReviewAction = {
	type: ReviewActionTypes.SET_REVIEW_TEXT,
	payload: string
}
export type ReviewAction = ChangeRequestParamValueReviewAction | ChangeChosenRequestIdReviewAction | SetReviewTextReviewAction
export type ReviewState = {
	chosenRequestId: number
	requests: Request[]
	reviewText: string
}
