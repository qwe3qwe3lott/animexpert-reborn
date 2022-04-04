export type AnimeStatus = 'released' | 'anons' | 'ongoing'
export type AnimeKind = 'tv' | 'movie' | 'ova' | 'ona' | 'special' | 'music' | 'tv_13' | 'tv_24' | 'tv_48'

export type Anime = {
	id: number
	name: string
	russian: string
	image: {
		original: string
		preview: string
		x96: string
		x48: string
	}
	url: string
	kind: AnimeKind
	score: string
	status: AnimeStatus
	episodes: number
	'episodes_aired': number
	'aired_on': string
	'released_on': string
}
