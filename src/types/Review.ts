export enum ReviewTypes {
	Anime = 'Anime',
	Manga = 'Manga',
	Ranobe = 'Ranobe'
}

export enum ReviewOpinions {
	positive = 'positive',
	neutral = 'neutral',
	negative = 'negative'
}
export type BasicReview = {
	text: string
	opinion: ReviewOpinions
	targetId: number
}
export type AnimeReview = BasicReview & {
	type: ReviewTypes.Anime
}
export type MangaReview = BasicReview & {
	type: ReviewTypes.Manga
}
export type RanobeReview = BasicReview & {
	type: ReviewTypes.Ranobe
}
export type Review = AnimeReview | MangaReview | RanobeReview

export type ReviewAnswer = {
	id: number
	'user_id': number
	'anime_id': number | null
	'manga_id': number | null
	body: string
	opinion: ReviewOpinions
	'is_written_before_release': boolean
	'created_at': string
	'updated_at': string
	'comments_count': number
	'cached_votes_up': number
	'cached_votes_down': number
}
