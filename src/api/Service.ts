import {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';
import {store} from '../store';

export abstract class Service {
	private axiosInstance: AxiosInstance;

	constructor(axiosInstance: AxiosInstance) {
		this.axiosInstance = axiosInstance;
	}

	protected isAxiosError(object: any): object is AxiosError {
		return 'isAxiosError' in object;
	}

	protected async axiosCall<T>(config: AxiosRequestConfig): Promise<T | AxiosError> {
		try {
			const {data} = await this.axiosInstance.request<T>({...config, headers: {...config.headers, Authorization: `Bearer ${store.getState().auth.auth?.access_token}`}});
			return data;
		} catch (error) {
			console.log(error);
			return error as AxiosError<T>;
		}
	}
}
