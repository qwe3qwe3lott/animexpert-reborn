import {Request, RequestTypes} from '../../../types/Request';
import {RequestChangeEvent} from '../../../components/RequestSettings/events';

export enum ReviewActionTypes {
	CHANGE_REQUEST_PARAM_VALUE = 'CHANGE_REQUEST_PARAM_VALUE',
	SET_CHOSEN_TEXT_REQUEST_ID = 'SET_CHOSEN_TEXT_REQUEST_ID',
	SET_CHOSEN_MAIN_REQUEST_ID = 'SET_CHOSEN_MAIN_REQUEST_ID',
	CREATE_TEXT_REQUEST = 'CREATE_TEXT_REQUEST',
	DELETE_TEXT_REQUEST = 'DELETE_TEXT_REQUEST',
	CHANGE_TEXT_REQUEST_LABEL = 'CHANGE_TEXT_REQUEST_LABEL',
	SET_REVIEW_TEXT = 'SET_REVIEW_TEXT'
}
export type ChangeRequestParamValueReviewAction = {
	type: ReviewActionTypes.CHANGE_REQUEST_PARAM_VALUE,
	payload: RequestChangeEvent
};
export type ChangeChosenTextRequestIdReviewAction = {
	type: ReviewActionTypes.SET_CHOSEN_TEXT_REQUEST_ID
	payload: number | null
}
export type ChangeChosenMainRequestIdReviewAction = {
	type: ReviewActionTypes.SET_CHOSEN_MAIN_REQUEST_ID
	payload: number
}
export type CreateTextRequestReviewAction = {
	type: ReviewActionTypes.CREATE_TEXT_REQUEST
	payload: RequestTypes
}
export type DeleteTextRequestReviewAction = {
	type: ReviewActionTypes.DELETE_TEXT_REQUEST
	payload: number
}
export type ChangeTextRequestLabelReviewAction = {
	type: ReviewActionTypes.CHANGE_TEXT_REQUEST_LABEL
	payload: {
		requestId: number
		requestLabel: string
	}
}
export type SetReviewTextReviewAction = {
	type: ReviewActionTypes.SET_REVIEW_TEXT,
	payload: string
}
export type ReviewAction = ChangeRequestParamValueReviewAction | ChangeChosenTextRequestIdReviewAction |
	ChangeChosenMainRequestIdReviewAction | CreateTextRequestReviewAction | DeleteTextRequestReviewAction |
	ChangeTextRequestLabelReviewAction | SetReviewTextReviewAction
export type ReviewState = {
	chosenTextRequestId: number | null
	chosenMainRequestId: number
	mainRequests: Request[]
	textRequests: Request[]
	reviewText: string
}
