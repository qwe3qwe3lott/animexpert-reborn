import {OtherActionTypes} from '../store/reducers/other/types';
import {store} from '../store';

export function useMessageDisplayer(text?: string | string[], actions?: {label: string, action: () => void}[], header?: string, closable?: boolean): void {
	console.log(text);
	if (!text) {
		store.dispatch({type: OtherActionTypes.SET_MESSAGE, payload: null});
		return;
	}
	if (typeof text === 'string') text = [text];
	store.dispatch({type: OtherActionTypes.SET_MESSAGE, payload: {
		header: header,
		paragraphs: text,
		actions: actions,
		closable: closable,
	}});
}
