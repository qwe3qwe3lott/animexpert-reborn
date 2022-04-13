import {combineReducers} from 'redux';
import {otherReducer} from './other/otherReducer';
import {reviewReducer} from './review/reviewReducer';
import {authReducer} from './auth/authReducer';
import {requestsReducer} from './requests/requestsReducer';

export const rootReducer = combineReducers({
	other: otherReducer,
	review: reviewReducer,
	auth: authReducer,
	requests: requestsReducer,
});

export type RootState = ReturnType<typeof rootReducer>
