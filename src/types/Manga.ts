export type Manga = {
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
	volumes: number | null
	chapters: number | null
	'aired_on': string
	'released_on': string | null
}
