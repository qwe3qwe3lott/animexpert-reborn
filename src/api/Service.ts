import {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';

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
			const {data} = await this.axiosInstance.request<T>(config);
			return data;
		} catch (error) {
			return error as AxiosError<T>;
		}
	}
}
