import {Service} from './Service';
import {axiosInstance} from './axiosInstance';
import {Auth} from '../types/Auth';
import {AuthActionTypes} from '../store/reducers/auth/types';
import {store} from '../store';
import {displayModalMessage} from '../util/displayModalMessage';

class AuthService extends Service {
	async getTokens(authorizationCode: string): Promise<Auth | null> {
		const data = {
			grant_type: 'authorization_code',
			client_id: 'bce7ad35b631293ff006be882496b29171792c8839b5094115268da7a97ca34c',
			client_secret: '811459eada36b14ff0cf0cc353f8162e72a7d6e6c7930b647a5c587d1beffe68',
			code: authorizationCode,
			redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
		};
		const auth = await this.axiosCall<Auth>({method: 'post', url: '/oauth/token', data});
		return this.isAxiosError(auth) ? null : auth;
	}

	async refreshTokens(refreshToken: string): Promise<Auth | null> {
		const data = {
			grant_type: 'refresh_token',
			client_id: 'bce7ad35b631293ff006be882496b29171792c8839b5094115268da7a97ca34c',
			client_secret: '811459eada36b14ff0cf0cc353f8162e72a7d6e6c7930b647a5c587d1beffe68',
			refresh_token: refreshToken,
		};
		const auth = await this.axiosCall<Auth>({method: 'post', url: '/oauth/token', data});
		return this.isAxiosError(auth) ? null : auth;
	}

	// Для проверки авторизации при старте приложения
	async checkAuthOnLaunch(): Promise<void> {
		try {
			let auth: Auth | null = JSON.parse(localStorage.getItem('auth') ?? '');
			if (!auth) {
				localStorage.removeItem('auth');
				return;
			}
			// Если осталось 20% времени от длительности токена, то рефрешим его
			const refreshTime = auth.expires_in * 0.2;
			const currentSeconds = Math.round(Date.now() / 1000);
			const toRefresh = (auth.created_at + auth.expires_in) - currentSeconds < refreshTime;
			if (!toRefresh) {
				store.dispatch({type: AuthActionTypes.SET_AUTH, payload: auth});
				return;
			}
			auth = await authService.refreshTokens(auth.refresh_token);
			if (!auth) {
				localStorage.removeItem('auth');
				return;
			}
			store.dispatch({type: AuthActionTypes.SET_AUTH, payload: auth});
			localStorage.setItem('auth', JSON.stringify(auth));
		} catch (e) {}
	}

	async logIn(authorizationCode: string): Promise<void> {
		const auth = await authService.getTokens(authorizationCode);
		if (!auth) {
			displayModalMessage('Введён неверный код авторизации');
			return;
		}
		store.dispatch({type: AuthActionTypes.SET_AUTH, payload: auth});
		localStorage.setItem('auth', JSON.stringify(auth));
	}

	logOut(): void {
		store.dispatch({type: AuthActionTypes.SET_AUTH, payload: null});
		localStorage.removeItem('auth');
	}
}

export const authService = new AuthService(axiosInstance);
