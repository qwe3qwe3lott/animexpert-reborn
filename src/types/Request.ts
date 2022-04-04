import {RequestParam} from './RequestParam';

export enum RequestTypes {
	Anime = 'Anime',
	Manga = 'Manga',
	Ranobe = 'Manga',
	Person = 'Person'
}
export type BasicRequest = {
	id: number
	params: RequestParam[]
}
export type AnimesRequest = BasicRequest & {
	commentableType: RequestTypes.Anime
}
export type MangasRequest = BasicRequest & {
	commentableType: RequestTypes.Manga
}
export type RanobesRequest = BasicRequest & {
	commentableType: RequestTypes.Ranobe
}
export type PersonsRequest = BasicRequest & {
	commentableType: RequestTypes.Person
}
export type Request = AnimesRequest | MangasRequest | RanobesRequest | PersonsRequest
