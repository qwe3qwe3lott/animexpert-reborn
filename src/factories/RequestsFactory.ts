import {AnimesRequest, MangasRequest, RanobesRequest, Request, RequestTypes} from '../types/Request';
import {RequestParamTypes} from '../types/RequestParam';

export class RequestsFactory {
	private static requestId: number = 0;
	public static skipIds(count: number) {
		RequestsFactory.requestId += count;
	}
	public static produceRequest(requestType: RequestTypes, label?: string, id?: number): Request {
		switch (requestType) {
		case RequestTypes.Anime:
			return RequestsFactory.produceAnimeRequest(label, id);
		case RequestTypes.Manga:
			return RequestsFactory.produceMangaRequest(label, id);
		case RequestTypes.Ranobe:
			return RequestsFactory.produceRanobeRequest(label, id);
		default:
			return RequestsFactory.produceAnimeRequest(label, id);
		}
	}
	public static produceAnimeRequest(label = 'Аниме', id = RequestsFactory.requestId++): AnimesRequest {
		return {
			id: id,
			label: label,
			type: RequestTypes.Anime,
			params: [
				{
					type: RequestParamTypes.Number,
					name: 'page',
					value: 1,
					label: 'страница',
					required: false,
					restrictions: {min: 1, max: 100000}
				},
				{
					type: RequestParamTypes.Number,
					name: 'limit',
					label: 'лимит',
					required: false,
					value: 50,
					restrictions: {min: 1, max: 50}
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
						{value: 'random', label: 'рандому'}
					]
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
						{value: 'tv_48', label: 'сериал (длинный)', check: false}
					]
				},
				{
					type: RequestParamTypes.Number,
					name: 'score',
					value: 0,
					label: 'мин. оценка',
					required: false,
					restrictions: {
						min: 0,
						max: 10
					}
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
						{value: 'F', label: 'более 30 мин.'}
					]
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
						{value: 'rx', label: 'хентай', check: false}
					]
				},
				{
					type: RequestParamTypes.Single,
					name: 'censored',
					value: 'false',
					label: 'цензура',
					required: false,
					restrictions: [
						{value: 'true', label: 'с цензурой'},
						{value: 'false', label: 'без цензуры'}
					]
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
						{value: 'dropped', label: 'брошено', check: false}
					]
				},
				{
					type: RequestParamTypes.Multiple,
					name: 'status',
					label: 'статус',
					required: false,
					values: [
						{value: 'anons', label: 'анонсировано', check: false},
						{value: 'ongoing', label: 'выходит', check: false},
						{value: 'released', label: 'вышло', check: false}
					]
				},
				{
					type: RequestParamTypes.Multiple,
					name: 'genre',
					label: 'жанр',
					required: false,
					values: [
						{value: '8', label: 'Драма', check: false},
						{value: '11', label: 'Игры', check: false},
						{value: '40', label: 'Психологическое', check: false},
						{value: '2', label: 'Приключения', check: false},
						{value: '19', label: 'Музыка', check: false},
						{value: '543', label: 'Гурман', check: false},
						{value: '1', label: 'Экшен', check: false},
						{value: '4', label: 'Комедия', check: false},
						{value: '6', label: 'Демоны', check: false},
						{value: '39', label: 'Полиция', check: false},
						{value: '29', label: 'Космос', check: false},
						{value: '9', label: 'Этти', check: false},
						{value: '10', label: 'Фэнтези', check: false},
						{value: '12', label: 'Хентай', check: false},
						{value: '13', label: 'Исторический', check: false},
						{value: '14', label: 'Ужасы', check: false},
						{value: '16', label: 'Магия', check: false},
						{value: '18', label: 'Меха', check: false},
						{value: '20', label: 'Пародия', check: false},
						{value: '21', label: 'Самураи', check: false},
						{value: '22', label: 'Романтика', check: false},
						{value: '23', label: 'Школа', check: false},
						{value: '539', label: 'Эротика', check: false},
						{value: '27', label: 'Сёнен', check: false},
						{value: '30', label: 'Спорт', check: false},
						{value: '32', label: 'Вампиры', check: false},
						{value: '33', label: 'Яой', check: false},
						{value: '34', label: 'Юри', check: false},
						{value: '35', label: 'Гарем', check: false},
						{value: '36', label: 'Повседневность', check: false},
						{value: '26', label: 'Сёдзё-ай', check: false},
						{value: '43', label: 'Дзёсей', check: false},
						{value: '37', label: 'Сверхъестественное', check: false},
						{value: '41', label: 'Триллер', check: false},
						{value: '24', label: 'Фантастика', check: false},
						{value: '25', label: 'Сёдзё', check: false},
						{value: '31', label: 'Супер сила', check: false},
						{value: '38', label: 'Военное', check: false},
						{value: '7', label: 'Детектив', check: false},
						{value: '15', label: 'Детское', check: false},
						{value: '3', label: 'Машины', check: false},
						{value: '17', label: 'Боевые искусства', check: false},
						{value: '5', label: 'Безумие', check: false},
						{value: '541', label: 'Работа', check: false},
						{value: '42', label: 'Сэйнэн', check: false},
						{value: '28', label: 'Сёнен-ай', check: false}
					]
				}
			]
		};
	}

	public static produceMangaRequest(label = 'Манга', id = RequestsFactory.requestId++): MangasRequest {
		return {
			id: id,
			label: label,
			type: RequestTypes.Manga,
			params: [
				{
					type: RequestParamTypes.Number,
					name: 'page',
					value: 1,
					label: 'страница',
					required: false,
					restrictions: {min: 1, max: 100000}
				},
				{
					type: RequestParamTypes.Number,
					name: 'limit',
					label: 'лимит',
					required: false,
					value: 50,
					restrictions: {min: 1, max: 50}
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
						{value: 'volumes', label: 'количеству томов'},
						{value: 'chapters', label: 'количеству глав'},
						{value: 'status', label: 'статусу'},
						{value: 'random', label: 'рандому'}
					]
				},
				{
					type: RequestParamTypes.Multiple,
					name: 'kind',
					label: 'тип',
					required: false,
					values: [
						{value: 'manga', label: 'манга', check: false},
						{value: 'manhwa', label: 'манхва', check: false},
						{value: 'manhua', label: 'маньхуа', check: false},
						{value: 'one_shot', label: 'ваншот', check: false},
						{value: 'doujin', label: 'додзинси', check: false}
					]
				},
				{
					type: RequestParamTypes.Number,
					name: 'score',
					value: 0,
					label: 'мин. оценка',
					required: false,
					restrictions: {
						min: 0,
						max: 10
					}
				},
				{
					type: RequestParamTypes.Single,
					name: 'censored',
					value: 'false',
					label: 'цензура',
					required: false,
					restrictions: [
						{value: 'true', label: 'с цензурой'},
						{value: 'false', label: 'без цензуры'}
					]
				},
				{
					type: RequestParamTypes.Multiple,
					name: 'mylist',
					label: 'в моём списке',
					required: false,
					values: [
						{value: 'planned', label: 'запланировано', check: false},
						{value: 'watching', label: 'читаю', check: false},
						{value: 'rewatching', label: 'перечитываю', check: false},
						{value: 'completed', label: 'прочитано', check: false},
						{value: 'on_hold', label: 'отложено', check: false},
						{value: 'dropped', label: 'брошено', check: false}
					]
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
						{value: 'paused', label: 'приостановлено', check: false},
						{value: 'discontinued', label: 'заброшено', check: false}
					]
				},
				{
					type: RequestParamTypes.Multiple,
					name: 'genre',
					label: 'жанр',
					required: false,
					values: [
						{value: '50', label: 'Драма', check: false},
						{value: '79', label: 'Игры', check: false},
						{value: '67', label: 'Психологическое', check: false},
						{value: '68', label: 'Приключения', check: false},
						{value: '78', label: 'Музыка', check: false},
						{value: '544', label: 'Гурман', check: false},
						{value: '56', label: 'Экшен', check: false},
						{value: '49', label: 'Комедия', check: false},
						{value: '72', label: 'Демоны', check: false},
						{value: '89', label: 'Полиция', check: false},
						{value: '85', label: 'Космос', check: false},
						{value: '51', label: 'Этти', check: false},
						{value: '57', label: 'Фэнтези', check: false},
						{value: '59', label: 'Хентай', check: false},
						{value: '69', label: 'Исторический', check: false},
						{value: '80', label: 'Ужасы', check: false},
						{value: '58', label: 'Магия', check: false},
						{value: '83', label: 'Меха', check: false},
						{value: '86', label: 'Пародия', check: false},
						{value: '88', label: 'Самураи', check: false},
						{value: '62', label: 'Романтика', check: false},
						{value: '60', label: 'Школа', check: false},
						{value: '540', label: 'Эротика', check: false},
						{value: '47', label: 'Сёнен', check: false},
						{value: '76', label: 'Спорт', check: false},
						{value: '64', label: 'Вампиры', check: false},
						{value: '65', label: 'Яой', check: false},
						{value: '75', label: 'Юри', check: false},
						{value: '71', label: 'Гарем', check: false},
						{value: '54', label: 'Повседневность', check: false},
						{value: '73', label: 'Сёдзё-ай', check: false},
						{value: '87', label: 'Дзёсей', check: false},
						{value: '48', label: 'Сверхъестественное', check: false},
						{value: '81', label: 'Триллер', check: false},
						{value: '53', label: 'Фантастика', check: false},
						{value: '63', label: 'Сёдзё', check: false},
						{value: '82', label: 'Супер сила', check: false},
						{value: '70', label: 'Военное', check: false},
						{value: '46', label: 'Детектив', check: false},
						{value: '77', label: 'Детское', check: false},
						{value: '84', label: 'Машины', check: false},
						{value: '66', label: 'Боевые искусства', check: false},
						{value: '90', label: 'Безумие', check: false},
						{value: '542', label: 'Работа', check: false},
						{value: '52', label: 'Сэйнэн', check: false},
						{value: '55', label: 'Сёнен-ай', check: false},
						{value: '74', label: 'Смена пола', check: false},
						{value: '61', label: 'Додзинси', check: false}
					]
				}
			]
		};
	}

	public static produceRanobeRequest(label = 'Ранобэ', id = RequestsFactory.requestId++): RanobesRequest {
		return {
			id: id,
			label: label,
			type: RequestTypes.Ranobe,
			params: [
				{
					type: RequestParamTypes.Number,
					name: 'page',
					value: 1,
					label: 'страница',
					required: false,
					restrictions: {min: 1, max: 100000}
				},
				{
					type: RequestParamTypes.Number,
					name: 'limit',
					label: 'лимит',
					required: false,
					value: 50,
					restrictions: {min: 1, max: 50}
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
						{value: 'volumes', label: 'количеству томов'},
						{value: 'chapters', label: 'количеству глав'},
						{value: 'status', label: 'статусу'},
						{value: 'random', label: 'рандому'}
					]
				},
				{
					type: RequestParamTypes.Number,
					name: 'score',
					value: 0,
					label: 'мин. оценка',
					required: false,
					restrictions: {
						min: 0,
						max: 10
					}
				},
				{
					type: RequestParamTypes.Single,
					name: 'censored',
					value: 'false',
					label: 'цензура',
					required: false,
					restrictions: [
						{value: 'true', label: 'с цензурой'},
						{value: 'false', label: 'без цензуры'}
					]
				},
				{
					type: RequestParamTypes.Multiple,
					name: 'mylist',
					label: 'в моём списке',
					required: false,
					values: [
						{value: 'planned', label: 'запланировано', check: false},
						{value: 'watching', label: 'читаю', check: false},
						{value: 'rewatching', label: 'перечитываю', check: false},
						{value: 'completed', label: 'прочитано', check: false},
						{value: 'on_hold', label: 'отложено', check: false},
						{value: 'dropped', label: 'брошено', check: false}
					]
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
						{value: 'paused', label: 'приостановлено', check: false},
						{value: 'discontinued', label: 'заброшено', check: false}
					]
				},
				{
					type: RequestParamTypes.Multiple,
					name: 'genre',
					label: 'жанр',
					required: false,
					values: [
						{value: '50', label: 'Драма', check: false},
						{value: '79', label: 'Игры', check: false},
						{value: '67', label: 'Психологическое', check: false},
						{value: '68', label: 'Приключения', check: false},
						{value: '78', label: 'Музыка', check: false},
						{value: '544', label: 'Гурман', check: false},
						{value: '56', label: 'Экшен', check: false},
						{value: '49', label: 'Комедия', check: false},
						{value: '72', label: 'Демоны', check: false},
						{value: '89', label: 'Полиция', check: false},
						{value: '85', label: 'Космос', check: false},
						{value: '51', label: 'Этти', check: false},
						{value: '57', label: 'Фэнтези', check: false},
						{value: '59', label: 'Хентай', check: false},
						{value: '69', label: 'Исторический', check: false},
						{value: '80', label: 'Ужасы', check: false},
						{value: '58', label: 'Магия', check: false},
						{value: '83', label: 'Меха', check: false},
						{value: '86', label: 'Пародия', check: false},
						{value: '88', label: 'Самураи', check: false},
						{value: '62', label: 'Романтика', check: false},
						{value: '60', label: 'Школа', check: false},
						{value: '540', label: 'Эротика', check: false},
						{value: '47', label: 'Сёнен', check: false},
						{value: '76', label: 'Спорт', check: false},
						{value: '64', label: 'Вампиры', check: false},
						{value: '65', label: 'Яой', check: false},
						{value: '75', label: 'Юри', check: false},
						{value: '71', label: 'Гарем', check: false},
						{value: '54', label: 'Повседневность', check: false},
						{value: '73', label: 'Сёдзё-ай', check: false},
						{value: '87', label: 'Дзёсей', check: false},
						{value: '48', label: 'Сверхъестественное', check: false},
						{value: '81', label: 'Триллер', check: false},
						{value: '53', label: 'Фантастика', check: false},
						{value: '63', label: 'Сёдзё', check: false},
						{value: '82', label: 'Супер сила', check: false},
						{value: '70', label: 'Военное', check: false},
						{value: '46', label: 'Детектив', check: false},
						{value: '77', label: 'Детское', check: false},
						{value: '84', label: 'Машины', check: false},
						{value: '66', label: 'Боевые искусства', check: false},
						{value: '90', label: 'Безумие', check: false},
						{value: '542', label: 'Работа', check: false},
						{value: '52', label: 'Сэйнэн', check: false},
						{value: '55', label: 'Сёнен-ай', check: false},
						{value: '74', label: 'Смена пола', check: false},
						{value: '61', label: 'Додзинси', check: false}
					]
				}
			]
		};
	}
}
