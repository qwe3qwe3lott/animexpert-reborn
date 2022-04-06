import {combineReducers} from 'redux';
import {homeReducer} from './home/homeReducer';
import {reviewReducer} from './review/reviewReducer';
import {authReducer} from './auth/authReducer';

export const rootReducer = combineReducers({
	home: homeReducer,
	review: reviewReducer,
	auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>
