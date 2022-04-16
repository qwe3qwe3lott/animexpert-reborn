import {combineReducers} from 'redux';
import {otherReducer} from './other/otherReducer';
import {reviewReducer} from './review/reviewReducer';
import {authReducer} from './auth/authReducer';
import {requestsReducer} from './requests/requestsReducer';
import {OtherAction} from './other/types';
import {ReviewAction} from './review/types';
import {AuthAction} from './auth/types';
import {RequestsAction} from './requests/types';
import {ThunkDispatch} from 'redux-thunk';

export const rootReducer = combineReducers({
	other: otherReducer,
	review: reviewReducer,
	auth: authReducer,
	requests: requestsReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export type RootAction = OtherAction | ReviewAction | AuthAction | RequestsAction

export type RootThunkDispatch = ThunkDispatch<RootState, undefined, RootAction>
