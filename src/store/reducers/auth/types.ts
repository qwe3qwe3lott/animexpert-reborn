import {Auth} from '../../../types/Auth';

export enum AuthActionTypes {
	SET_AUTH = 'SET_AUTH'
}
export type SetAuthAuthAction = {
	type: AuthActionTypes.SET_AUTH
	payload: Auth | null
};
export type AuthAction = SetAuthAuthAction
export type AuthState = {
	auth: Auth | null
}
