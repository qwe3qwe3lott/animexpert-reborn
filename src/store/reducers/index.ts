import {combineReducers} from 'redux';
import {homeReducer} from './home/homeReducer';
import {reviewReducer} from './review/reviewReducer';

export const rootReducer = combineReducers({
	home: homeReducer,
	review: reviewReducer,
});

export type RootState = ReturnType<typeof rootReducer>
