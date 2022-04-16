import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer, RootState, RootThunkDispatch} from './reducers';

export const store = createStore(rootReducer, applyMiddleware<RootThunkDispatch, RootState>(thunk));
