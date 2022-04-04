import {ReviewAction, ReviewActionTypes, ReviewState} from './types';
import {RequestsFactory} from '../../../factories/RequestsFactory';
import {RequestParamTypes} from '../../../types/RequestParam';

const initialState: ReviewState = {
	mainRequests: [RequestsFactory.produceAnimeRequest()],
	textRequests: [],
};
export const reviewReducer = (state = initialState, action: ReviewAction) => {
	const payload = action.payload;
	switch (action.type) {
	case ReviewActionTypes.CHANGE_REQUEST_NUMBER_PARAM_VALUE:
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
	default:
		return state;
	}
};
