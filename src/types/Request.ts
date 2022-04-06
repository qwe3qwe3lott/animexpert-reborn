import {RequestParam} from './RequestParam';

export enum RequestTypes {
	Anime = 'Anime',
	Manga = 'Manga',
	Ranobe = 'Manga',
	Person = 'Person'
}
export type BasicRequest = {
	id: number
	label: string
	params: RequestParam[]
}
export type AnimesRequest = BasicRequest & {
	requestType: RequestTypes.Anime
}
export type MangasRequest = BasicRequest & {
	requestType: RequestTypes.Manga
}
export type RanobesRequest = BasicRequest & {
	requestType: RequestTypes.Ranobe
}
export type PersonsRequest = BasicRequest & {
	requestType: RequestTypes.Person
}
export type Request = AnimesRequest | MangasRequest | RanobesRequest | PersonsRequest
