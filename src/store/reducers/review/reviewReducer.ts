import {ReviewAction, ReviewActionTypes, ReviewState} from './types';
import {RequestsFactory} from '../../../factories/RequestsFactory';
import {RequestParamTypes} from '../../../types/RequestParam';
import {RequestTypes} from '../../../types/Request';

const initialState: ReviewState = {
	chosenMainRequestId: 0,
	chosenTextRequestId: null,
	mainRequests: [
		RequestsFactory.produceRequest(RequestTypes.Anime),
		RequestsFactory.produceRequest(RequestTypes.Manga),
		RequestsFactory.produceRequest(RequestTypes.Ranobe),
	],
	textRequests: [],
	reviewText: '',
};
export const reviewReducer = (state = initialState, action: ReviewAction): ReviewState => {
	switch (action.type) {
	case ReviewActionTypes.SET_CHOSEN_TEXT_REQUEST_ID:
		return {...state, chosenTextRequestId: action.payload};
	case ReviewActionTypes.CHANGE_REQUEST_PARAM_VALUE:
		const payload = action.payload;
		let mainRequestWasChanged: boolean | null = null;
		let request = state.mainRequests.find((request) => request.id === payload.requestId);
		if (request) mainRequestWasChanged = true;
		else {
			request = state.textRequests.find((request) => request.id === payload.requestId);
			if (request) mainRequestWasChanged = false;
		}
		if (mainRequestWasChanged === null || request === undefined) return state;

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
		return mainRequestWasChanged ? {...state, mainRequests: [...state.mainRequests]} : {...state, textRequests: [...state.textRequests]};
	case ReviewActionTypes.SET_CHOSEN_MAIN_REQUEST_ID:
		return {...state, chosenMainRequestId: action.payload};
	case ReviewActionTypes.CREATE_TEXT_REQUEST:
		state.textRequests.push(RequestsFactory.produceRequest(action.payload));
		return {...state, textRequests: [...state.textRequests]};
	case ReviewActionTypes.DELETE_TEXT_REQUEST:
		const textRequests = state.textRequests.filter((request) => request.id !== action.payload);
		return {...state, textRequests};
	case ReviewActionTypes.CHANGE_TEXT_REQUEST_LABEL:
		if (!/^[а-яА-Яa-zA-Z0-1 ]{1,30}$/.test(action.payload.requestLabel)) return state;
		const textRequest = state.textRequests.find((request) => request.id === action.payload.requestId);
		if (!textRequest) return state;
		textRequest.label = action.payload.requestLabel;
		return {...state, textRequests: [...state.textRequests]};
	case ReviewActionTypes.SET_REVIEW_TEXT:
		return {...state, reviewText: action.payload};
	default:
		return state;
	}
};
