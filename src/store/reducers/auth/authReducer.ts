import {AuthAction, AuthActionTypes, AuthState} from './types';

const initialState: AuthState = {
	auth: null
};
export const authReducer = (state = initialState, action: AuthAction): AuthState => {
	switch (action.type) {
	case AuthActionTypes.SET_AUTH:
		return {...state, auth: action.payload};
	default:
		return state;
	}
};
