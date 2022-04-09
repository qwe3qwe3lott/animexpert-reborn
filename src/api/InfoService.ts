import {axiosInstance} from './axiosInstance';
import {Anime} from '../types/Anime';
import {Service} from './Service';
import {AnimesRequest, MangasRequest, RanobesRequest, Request, RequestTypes} from '../types/Request';
import {RequestParamTypes} from '../types/RequestParam';
import {Manga} from '../types/Manga';
import {Ranobe} from '../types/Ranobe';
import {Position} from '../types/Position';

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

	async getPositions(request: Request): Promise<Position[]> {
		switch (request.type) {
		case RequestTypes.Anime:
			return await this.getAnimes(request);
		case RequestTypes.Manga:
			return await this.getMangas(request);
		case RequestTypes.Ranobe:
			return await this.getRanobes(request);
		case RequestTypes.Person:
			throw new Error('Получение людей пока не работает');
		}
	}

	async getAnimes(request: AnimesRequest): Promise<Anime[]> {
		const animes = await this.axiosCall<Anime[]>({method: 'get', url: '/api/animes', params: this.parseRequest(request)});
		if (this.isAxiosError(animes)) return [];
		return animes;
	}

	async getMangas(request: MangasRequest): Promise<Manga[]> {
		const mangas = await this.axiosCall<Manga[]>({method: 'get', url: '/api/mangas', params: this.parseRequest(request)});
		if (this.isAxiosError(mangas)) return [];
		return mangas;
	}

	async getRanobes(request: RanobesRequest): Promise<Ranobe[]> {
		const ranobes = await this.axiosCall<Ranobe[]>({method: 'get', url: '/api/ranobe', params: this.parseRequest(request)});
		if (this.isAxiosError(ranobes)) return [];
		return ranobes;
	}
}

export const infoService = new InfoService(axiosInstance);
