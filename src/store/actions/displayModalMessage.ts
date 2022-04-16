import {OtherActionTypes} from '../reducers/other/types';
import {ModalMessage} from '../../types/ModalMessage';
import {ThunkAction} from 'redux-thunk';
import {RootAction, RootState} from '../reducers';

export const displayModalMessage = (message?: string | string[] | ModalMessage): ThunkAction<void, RootState, unknown, RootAction> => (dispatch) => {
	console.log('displayModalMessage', message);
	if (!message) {
		dispatch({type: OtherActionTypes.SET_MESSAGE, payload: null});
		return;
	}
	if (typeof message === 'string') message = [message];
	if (Array.isArray(message)) {
		dispatch({type: OtherActionTypes.SET_MESSAGE, payload: {paragraphs: message as string[]}});
		return;
	}
	dispatch({type: OtherActionTypes.SET_MESSAGE, payload: message as ModalMessage});
};
