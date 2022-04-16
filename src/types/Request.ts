import {RequestParam} from './RequestParam';

export enum RequestTypes {
	Anime = 'Anime',
	Manga = 'Manga',
	Ranobe = 'Ranobe',
	User = 'User'
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
export type UsersRequest = BasicRequest & {
	type: RequestTypes.User
}
export type Request = AnimesRequest | MangasRequest | RanobesRequest | UsersRequest
