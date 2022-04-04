import {ReviewAction, ReviewActionTypes, ReviewState} from './types';
import {RequestsFactory} from '../../../factories/RequestsFactory';
import {NumberRequestParam} from '../../../types/RequestParam';

const initialState: ReviewState = {
	mainRequests: [RequestsFactory.produceAnimeRequest()],
	textRequests: [],
};
export const reviewReducer = (state = initialState, action: ReviewAction) => {
	const payload = action.payload;
	switch (action.type) {
	case ReviewActionTypes.CHANGE_REQUEST_NUMBER_PARAM_VALUE:
		let request = state.mainRequests.find((request) => request.id === payload.requestId);
		if (request) {
			const param = request.params.find((param) => param.name === payload.paramName) as NumberRequestParam;
			if (payload.value < param.restrictions.min || payload.value > param.restrictions.max) return state;
			if (param) {
				param.value = payload.value;
				return {...state, mainRequests: [...state.mainRequests]};
			}
		}
		request = state.textRequests.find((request) => request.id === payload.requestId);
		if (request) {
			const param = request.params.find((param) => param.name === payload.paramName) as NumberRequestParam;
			if (payload.value < param.restrictions.min || payload.value > param.restrictions.max) return state;
			if (param) {
				param.value = payload.value;
				return {...state, textRequests: [...state.textRequests]};
			}
		}
		return state;
	default:
		return state;
	}
};
