export enum CommentTypes {
	Anime = 'Anime',
	Manga = 'Manga',
	Ranobe = 'Ranobe',
	User = 'User',
	Topic = 'Topic'
}

export type Comment = {
	text: string
	type: CommentTypes
	commentableId: number
}

export type CommentAnswer = {
	id: number
	'user_id': number
	'commentable_id': number
	'commentable_type': CommentTypes
	body: string
	'html_body': string
	'created_at': string
	'updated_at': string
	'is_offtopic': boolean,
	'is_summary': boolean,
	'can_be_edited': boolean
	'user': {
		'id': number,
		'nickname': string,
		'avatar': string,
		'image': {
			'x160': string,
			'x148': string,
			'x80': string,
			'x64': string,
			'x48': string,
			'x32': string,
			'x16': string
		},
		'last_online_at': string,
		'url': string
	}
}
