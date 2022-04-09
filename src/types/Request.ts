import {RequestParam} from './RequestParam';

export enum RequestTypes {
	Anime = 'Anime',
	Manga = 'Manga',
	Ranobe = 'Ranobe',
	Person = 'Person'
}
export type BasicRequest = {
	id: number
	label: string
	params: RequestParam[]
}
export type AnimesRequest = BasicRequest & {
	type: RequestTypes.Anime
}
export type MangasRequest = BasicRequest & {
	type: RequestTypes.Manga
}
export type RanobesRequest = BasicRequest & {
	type: RequestTypes.Ranobe
}
export type PersonsRequest = BasicRequest & {
	type: RequestTypes.Person
}
export type Request = AnimesRequest | MangasRequest | RanobesRequest | PersonsRequest
