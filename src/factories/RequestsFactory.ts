import {AnimesRequest, RequestTypes} from '../types/Request';
import {RequestParamTypes} from '../types/RequestParam';

export class RequestsFactory {
	private static requestId: number = 0;
	public static produceAnimeRequest(): AnimesRequest {
		return {
			id: RequestsFactory.requestId++,
			label: 'Аниме',
			commentableType: RequestTypes.Anime,
			params: [
				{
					type: RequestParamTypes.Number,
					name: 'page',
					value: 1,
					label: 'страница',
					required: false,
					restrictions: {min: 1, max: 100000},
				},
				{
					type: RequestParamTypes.Number,
					name: 'limit',
					label: 'лимит',
					required: false,
					value: 50,
					restrictions: {min: 1, max: 50},
				},
				{
					type: RequestParamTypes.Single,
					name: 'order',
					value: 'id',
					label: 'сортировка по',
					required: false,
					restrictions: [
						{value: 'id', label: 'id'},
						{value: 'ranked', label: 'оценке'},
						{value: 'kind', label: 'типу'},
						{value: 'popularity', label: 'популярности'},
						{value: 'name', label: 'названию'},
						{value: 'aired_on', label: 'дате релиза'},
						{value: 'episodes', label: 'количеству эпизодов'},
						{value: 'status', label: 'статусу'},
						{value: 'random', label: 'рандому'},
					],
				},
				{
					type: RequestParamTypes.Multiple,
					name: 'kind',
					label: 'тип',
					required: false,
					values: [
						{value: 'tv', label: 'сериал', check: false},
						{value: 'movie', label: 'фильм', check: false},
						{value: 'ova', label: 'ova', check: false},
						{value: 'ona', label: 'ona', check: false},
						{value: 'special', label: 'спешл', check: false},
						{value: 'music', label: 'клип', check: false},
						{value: 'tv_13', label: 'сериал (короткий)', check: false},
						{value: 'tv_24', label: 'сериал (средний)', check: false},
						{value: 'tv_48', label: 'сериал (длинный)', check: false},
					],
				},
				{
					type: RequestParamTypes.Number,
					name: 'score',
					value: 1,
					label: 'мин. оценка',
					required: false,
					restrictions: {
						min: 1,
						max: 10,
					},
				},
				{
					type: RequestParamTypes.Single,
					name: 'duration',
					value: '',
					label: 'средняя продолжительность',
					required: false,
					restrictions: [
						{value: '', label: 'не учитывать'},
						{value: 'S', label: 'менее 10 мин.'},
						{value: 'D', label: 'менее 30 мин.'},
						{value: 'F', label: 'более 30 мин.'},
					],
				},
				{
					type: RequestParamTypes.Multiple,
					name: 'rating',
					label: 'возрастное ограничение',
					required: false,
					values: [
						{value: 'g', label: 'без ограничений', check: false},
						{value: 'pg', label: 'для детей', check: false},
						{value: 'pg_13', label: '13+', check: false},
						{value: 'r', label: '17+', check: false},
						{value: 'r_plus', label: 'на грани', check: false},
						{value: 'rx', label: 'хентай', check: false},
					],
				},
				{
					type: RequestParamTypes.Single,
					name: 'censored',
					value: 'false',
					label: 'цензура',
					required: false,
					restrictions: [
						{value: 'true', label: 'с цензурой'},
						{value: 'false', label: 'без цензуры'},
					],
				},
				{
					type: RequestParamTypes.Multiple,
					name: 'mylist',
					label: 'в моём списке',
					required: false,
					values: [
						{value: 'planned', label: 'запланировано', check: false},
						{value: 'watching', label: 'просматривается', check: false},
						{value: 'rewatching', label: 'пересматривается', check: false},
						{value: 'completed', label: 'просмотрено', check: false},
						{value: 'on_hold', label: 'отложено', check: false},
						{value: 'dropped', label: 'брошено', check: false},
					],
				},
				{
					type: RequestParamTypes.Multiple,
					name: 'status',
					label: 'статус',
					required: false,
					values: [
						{value: 'anons', label: 'анонсировано', check: false},
						{value: 'ongoing', label: 'выходит', check: false},
						{value: 'released', label: 'вышло', check: false},
					],
				},
			],
		};
	}
}
