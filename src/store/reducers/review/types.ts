import {Request} from '../../../types/Request';
import {RequestChangeEvent} from '../../../types/RequestChangeEvent';
import {ReviewOpinions} from '../../../types/Review';

export enum ReviewActionTypes {
	CHANGE_REQUEST_PARAM_VALUE = 'CHANGE_REQUEST_PARAM_VALUE',
	SET_CHOSEN_REVIEW_REQUEST_ID = 'SET_CHOSEN_REVIEW_REQUEST_ID',
	SET_REVIEW_TEXT = 'SET_REVIEW_TEXT',
	SET_REVIEW_OPINION = 'SET_REVIEW_OPINION',
	SET_REVIEW_FLAG = 'SET_REVIEW_FLAG',
	SET_OFF_TOPIC_FLAG = 'SET_OFF_TOPIC_FLAG'
}
export type ChangeRequestParamValueReviewAction = {
	type: ReviewActionTypes.CHANGE_REQUEST_PARAM_VALUE,
	payload: RequestChangeEvent
};
export type ChangeChosenReviewRequestIdReviewAction = {
	type: ReviewActionTypes.SET_CHOSEN_REVIEW_REQUEST_ID
	payload: number
}
export type SetReviewTextReviewAction = {
	type: ReviewActionTypes.SET_REVIEW_TEXT,
	payload: string
}
export type SetReviewOpinionReviewAction = {
	type: ReviewActionTypes.SET_REVIEW_OPINION,
	payload: ReviewOpinions
}
export type SetReviewFlagReviewAction = {
	type: ReviewActionTypes.SET_REVIEW_FLAG,
	payload: boolean
}
export type SetOffTopicFlagReviewAction = {
	type: ReviewActionTypes.SET_OFF_TOPIC_FLAG,
	payload: boolean
}
export type ReviewAction = ChangeRequestParamValueReviewAction | ChangeChosenReviewRequestIdReviewAction |
	SetReviewTextReviewAction | SetReviewOpinionReviewAction | SetReviewFlagReviewAction |
	SetOffTopicFlagReviewAction
export type ReviewState = {
	chosenRequestId: number
	requests: Request[]
	reviewText: string
	reviewOpinion: ReviewOpinions
	isReview: boolean
	isOffTopic: boolean
}
