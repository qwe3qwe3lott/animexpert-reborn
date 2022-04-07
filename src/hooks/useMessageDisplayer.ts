import {OtherActionTypes} from '../store/reducers/other/types';
import {store} from '../store';

export function useMessageDisplayer(message: string) {
	console.log(message);
	store.dispatch({type: OtherActionTypes.SET_MESSAGE, payload: message});
}
