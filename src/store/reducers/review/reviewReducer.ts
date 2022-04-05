import {ReviewAction, ReviewActionTypes, ReviewState} from './types';
import {RequestsFactory} from '../../../factories/RequestsFactory';
import {RequestParamTypes} from '../../../types/RequestParam';

const initialState: ReviewState = {
	chosenMainRequestId: 1,
	chosenTextRequestId: null,
	mainRequests: [RequestsFactory.produceAnimeRequest(), RequestsFactory.produceAnimeRequest()],
	textRequests: [],
};
export const reviewReducer = (state = initialState, action: ReviewAction): ReviewState => {
	switch (action.type) {
	case ReviewActionTypes.CHANGE_CHOSEN_TEXT_REQUEST_ID:
		const payload1 = action.payload;
		return {...state, chosenTextRequestId: payload1};
	case ReviewActionTypes.CHANGE_REQUEST_PARAM_VALUE:
		const payload2 = action.payload;
		let mainRequestWasChanged: boolean | null = null;
		let request = state.mainRequests.find((request) => request.id === payload2.requestId);
		if (request) mainRequestWasChanged = true;
		else {
			request = state.textRequests.find((request) => request.id === payload2.requestId);
			if (request) mainRequestWasChanged = false;
		}
		if (mainRequestWasChanged === null || request === undefined) return state;

		const param = request.params.find((param) => param.name === payload2.paramName);
		if (param === undefined) return state;
		switch (param.type) {
		case RequestParamTypes.Number:
			if (param.type !== payload2.type) return state;
			if (payload2.value < param.restrictions.min || payload2.value > param.restrictions.max) return state;
			param.value = payload2.value;
			break;
		case RequestParamTypes.Single:
			if (param.type !== payload2.type) return state;
			if (!param.restrictions.some((restriction) => restriction.value === payload2.value)) return state;
			param.value = payload2.value;
			break;
		case RequestParamTypes.Multiple:
			if (param.type !== payload2.type) return state;
			const checkBox = param.values.find(((element) => element.value === payload2.value.valueOfValues));
			if (!checkBox) return state;
			checkBox.check = payload2.value.flag;
			break;
		default:
			return state;
		}
		return mainRequestWasChanged ? {...state, mainRequests: [...state.mainRequests]} : {...state, textRequests: [...state.textRequests]};
	case ReviewActionTypes.CHANGE_CHOSEN_MAIN_REQUEST_ID:
		const payload3 = action.payload;
		return {...state, chosenMainRequestId: payload3};
	default:
		return state;
	}
};
