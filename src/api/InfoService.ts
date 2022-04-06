import {axiosInstance} from './axiosInstance';
import {Anime} from '../types/Anime';
import {Service} from './Service';
import {AnimesRequest, Request} from '../types/Request';
import {RequestParamTypes} from '../types/RequestParam';

class InfoService extends Service {
	private parseRequest(request: Request): object {
		const params: {[index: string]:any} = {};
		for (const param of request.params) {
			switch (param.type) {
			case RequestParamTypes.Number:
				if (param.value) params[param.name] = param.value;
				break;
			case RequestParamTypes.Single:
				if (param.value) params[param.name] = param.value;
				break;
			case RequestParamTypes.Multiple:
				const values = param.values.filter((valueOfValues) => valueOfValues.check);
				if (values.length > 0) params[param.name] = values.map((valueOfValues) => valueOfValues.value).join(',');
				break;
			}
		}
		return params;
	}

	async getAnimes(request: AnimesRequest): Promise<Anime[]> {
		const animes = await this.axiosCall<Anime[]>({method: 'get', url: '/api/animes', params: this.parseRequest(request)});
		if (this.isAxiosError(animes)) return [];
		return animes;
	}
}

export const infoService = new InfoService(axiosInstance);
