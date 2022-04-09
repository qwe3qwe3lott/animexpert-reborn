import {OtherActionTypes} from '../store/reducers/other/types';
import {store} from '../store';
import {ModalMessage} from '../types/ModalMessage';

export function displayModalMessage(message?: string | string[] | ModalMessage): void {
	console.log('displayModalMessage', message);
	if (!message) {
		store.dispatch({type: OtherActionTypes.SET_MESSAGE, payload: null});
		return;
	}
	if (typeof message === 'string') message = [message];
	if (Array.isArray(message)) {
		store.dispatch({type: OtherActionTypes.SET_MESSAGE, payload: {paragraphs: message as string[]}});
		return;
	}
	store.dispatch({type: OtherActionTypes.SET_MESSAGE, payload: message as ModalMessage});
}
