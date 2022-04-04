import {AnimesRequest, RequestTypes} from '../types/Request';
import {RequestParamTypes} from '../types/RequestParam';
export class RequestsFactory {
	private static requestId: number = 0;
	public static produceAnimeRequest(): AnimesRequest {
		return {
			id: RequestsFactory.requestId++,
			commentableType: RequestTypes.Anime,
			params: [
				{
					type: RequestParamTypes.Number,
					name: 'page',
					value: 1,
					label: 'страница',
					required: false,
					restrictions: {
						min: 1,
						max: 100000,
					},
				},
				{
					type: RequestParamTypes.Number,
					name: 'limit',
					label: 'лимит',
					required: false,
					value: 50,
					restrictions: {
						min: 0,
						max: 50,
					},
				},
			],
		};
	}
}
