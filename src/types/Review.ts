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
