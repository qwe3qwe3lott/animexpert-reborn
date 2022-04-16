import {Request} from '../types/Request';
import {store} from '../store';
import {displayModalMessage} from '../store/actions/displayModalMessage';
import {RequestsFactory} from '../factories/RequestsFactory';
import {RequestsActionTypes} from '../store/reducers/requests/types';

class RequestsService {
	saveRequests(requests: Request[]) {
		store.dispatch(displayModalMessage({paragraphs: ['сохранение...'], closable: false}));
		localStorage.setItem('requests', JSON.stringify(requests));
		store.dispatch(displayModalMessage('Запросы успешно сохранены'));
	}
	loadRequestsOnLaunch() {
		try {
			const requests: Request[] | null = JSON.parse(localStorage.getItem('requests') ?? '');
			if (!requests) {
				localStorage.removeItem('requests');
				return;
			}
			RequestsFactory.skipIds(requests.length);
			for (let i = 0; i < requests.length; i++) {
				requests[i].id = i;
			}
			store.dispatch({type: RequestsActionTypes.SET_REQUESTS, payload: requests});
		} catch (e) {
			localStorage.removeItem('requests');
		}
	}
}

export const requestsService = new RequestsService();
