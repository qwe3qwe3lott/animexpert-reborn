import {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';
import {store} from '../store';
import {delay} from '../util/delay';

export abstract class Service {
	private axiosInstance: AxiosInstance;

	constructor(axiosInstance: AxiosInstance) {
		this.axiosInstance = axiosInstance;
	}

	protected isAxiosError(object: any): object is AxiosError {
		return 'isAxiosError' in object;
	}

	private getAccessToken(): string | boolean {
		return store.getState().auth.auth ? `Bearer ${store.getState().auth.auth?.access_token}` : false;
	}

	protected async axiosCall<T>(config: AxiosRequestConfig): Promise<T | AxiosError> {
		await delay(2000);
		try {
			const {data} = await this.axiosInstance.request<T>({...config, headers: {...config.headers, Authorization: this.getAccessToken()}});
			return data;
		} catch (error) {
			console.log(error);
			return error as AxiosError<T>;
		}
	}
}
