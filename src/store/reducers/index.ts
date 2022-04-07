import {combineReducers} from 'redux';
import {otherReducer} from './other/otherReducer';
import {reviewReducer} from './review/reviewReducer';
import {authReducer} from './auth/authReducer';

export const rootReducer = combineReducers({
	other: otherReducer,
	review: reviewReducer,
	auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>
