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
	kind: string
	score: string
	status: string
	episodes: number | null
	'episodes_aired': number
	'aired_on': string
	'released_on': string | null
}
