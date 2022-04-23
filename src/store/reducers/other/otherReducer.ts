import {OtherAction, OtherActionTypes, OtherState} from './types';

const initialState: OtherState = {
	message: null
};
export const otherReducer = (state = initialState, action: OtherAction): OtherState => {
	switch (action.type) {
	case OtherActionTypes.SET_MESSAGE:
		return {...state, message: action.payload};
	default:
		return state;
	}
};
