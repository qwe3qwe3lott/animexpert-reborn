import {ReviewAction, ReviewActionTypes, ReviewState} from './types';
import {RequestsFactory} from '../../../factories/RequestsFactory';
import {RequestParamTypes} from '../../../types/RequestParam';
import {RequestTypes} from '../../../types/Request';

const initialState: ReviewState = {
	chosenRequestId: 0,
	requests: [
		RequestsFactory.produceRequest(RequestTypes.Anime),
		RequestsFactory.produceRequest(RequestTypes.Manga),
		RequestsFactory.produceRequest(RequestTypes.Ranobe),
	],
	reviewText: '',
};
export const reviewReducer = (state = initialState, action: ReviewAction): ReviewState => {
	switch (action.type) {
	case ReviewActionTypes.SET_CHOSEN_REQUEST_ID:
		return {...state, chosenRequestId: action.payload};
	case ReviewActionTypes.CHANGE_REQUEST_PARAM_VALUE:
		const payload = action.payload;
		const request = state.requests.find((request) => request.id === payload.requestId);
		if (!request) return state;

		const param = request.params.find((param) => param.name === payload.paramName);
		if (param === undefined) return state;
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
		case RequestParamTypes.Multiple:
			if (param.type !== payload.type) return state;
			const checkBox = param.values.find(((element) => element.value === payload.value.valueOfValues));
			if (!checkBox) return state;
			checkBox.check = payload.value.flag;
			break;
		default:
			return state;
		}
		return {...state, requests: [...state.requests]};
	case ReviewActionTypes.SET_REVIEW_TEXT:
		return {...state, reviewText: action.payload};
	default:
		return state;
	}
};
