import {RequestsAction, RequestsActionTypes, RequestsState} from './types';
import {RequestParamTypes} from '../../../types/RequestParam';
import {Request} from '../../../types/Request';
import {RequestsFactory} from '../../../factories/RequestsFactory';
import {requestLabelRegExp} from '../../../regularExpressions';

const initialState: RequestsState = {
	requests: [],
	chosenRequestId: null,
};

export const requestsReducer = (state = initialState, action: RequestsAction): RequestsState => {
	let request: Request | undefined;
	switch (action.type) {
	case RequestsActionTypes.CHANGE_REQUEST_PARAM_VALUE:
		const payload = action.payload;
		request = state.requests.find((request) => request.id === payload.requestId);
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
	case RequestsActionTypes.CREATE_REQUEST:
		if (state.requests.length > 30) return state;
		state.requests.push(RequestsFactory.produceRequest(action.payload));
		return {...state, requests: [...state.requests]};
	case RequestsActionTypes.DELETE_REQUEST:
		const requests = state.requests.filter((request) => request.id !== action.payload);
		return {...state, requests};
	case RequestsActionTypes.CHANGE_REQUEST_LABEL:
		if (!requestLabelRegExp.test(action.payload.requestLabel)) return state;
		request = state.requests.find((request) => request.id === action.payload.requestId);
		if (!request) return state;
		request.label = action.payload.requestLabel;
		return {...state, requests: [...state.requests]};
	case RequestsActionTypes.SET_CHOSEN_REQUEST_ID:
		return {...state, chosenRequestId: action.payload};
	default:
		return state;
	}
};
