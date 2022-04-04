import {axiosInstance} from './axiosInstance';
import {Anime} from '../types/Anime';
import {Service} from './Service';

class InfoService extends Service {
	async getAnimes(): Promise<Anime[]> {
		const animes = await this.axiosCall<Anime[]>({method: 'get', url: '/api/animes'});
		if (this.isAxiosError(animes)) return [];
		return animes;
	}
}

export const infoService = new InfoService(axiosInstance);
