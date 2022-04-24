import {ReviewAction, ReviewActionTypes, ReviewState} from './types';
import {RequestsFactory} from '../../../factories/RequestsFactory';
import {RequestParamTypes} from '../../../types/RequestParam';
import {RequestTypes} from '../../../types/Request';
import {ReviewOpinions} from '../../../types/Review';

const initialState: ReviewState = {
	chosenRequestId: -1,
	requests: [
		RequestsFactory.produceRequest(RequestTypes.Anime, undefined, -1),
		RequestsFactory.produceRequest(RequestTypes.Manga, undefined, -2),
		RequestsFactory.produceRequest(RequestTypes.Ranobe, undefined, -3)
	],
	reviewText: '',
	reviewOpinion: ReviewOpinions.neutral,
	isReview: true,
	isOffTopic: false
};
export const reviewReducer = (state = initialState, action: ReviewAction): ReviewState => {
	switch (action.type) {
	case ReviewActionTypes.SET_CHOSEN_REVIEW_REQUEST_ID:
		return {...state, chosenRequestId: action.payload};
	case ReviewActionTypes.CHANGE_REQUEST_PARAM_VALUE: {
		const payload = action.payload;
		const request = state.requests.find((request) => request.id === payload.requestId);
		if (!request) return state;

		const param = request.params.find((param) => param.name === payload.paramName);
		if (!param) return state;
		switch (param.type) {
		case RequestParamTypes.Number:
			if (param.type !== payload.type) return state;
			if (payload.value < param.restrictions.min || payload.value > param.restrictions.max) return state;
			param.value = payload.value;
			break;
		case RequestParamTypes.Single:
			if (param.type !== payload.type) return state;
			if (!param.restrictions.some((restriction) => restriction.value === payload.value)) return state;
			param.value = payload.value;
			break;
		case RequestParamTypes.Multiple: {
			if (param.type !== payload.type) return state;
			const checkBox = param.values.find(((element) => element.value === payload.value.valueOfValues));
			if (!checkBox) return state;
			checkBox.check = payload.value.flag;
			break;
		}
		default:
			return state;
		}
		return {...state, requests: [...state.requests]};
	}
	case ReviewActionTypes.SET_REVIEW_TEXT:
		return {...state, reviewText: action.payload};
	case ReviewActionTypes.SET_REVIEW_OPINION:
		return {...state, reviewOpinion: action.payload};
	case ReviewActionTypes.SET_REVIEW_FLAG:
		return {...state, isReview: action.payload};
	case ReviewActionTypes.SET_OFF_TOPIC_FLAG:
		return {...state, isOffTopic: action.payload};
	default:
		return state;
	}
};
