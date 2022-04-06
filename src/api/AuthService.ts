import {Service} from './Service';
import {axiosInstance} from './axiosInstance';
import {Auth} from '../types/Auth';

class AuthService extends Service {
	async toAuth(authorizationCode: string): Promise<Auth | null> {
		const data = {
			grant_type: 'authorization_code',
			client_id: 'bce7ad35b631293ff006be882496b29171792c8839b5094115268da7a97ca34c',
			client_secret: '811459eada36b14ff0cf0cc353f8162e72a7d6e6c7930b647a5c587d1beffe68',
			code: authorizationCode,
			redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
		};
		const auth = await this.axiosCall<Auth>({method: 'post', url: '/oauth/token', data});
		if (this.isAxiosError(auth)) return null;
		return auth;
	}
}

export const authService = new AuthService(axiosInstance);
