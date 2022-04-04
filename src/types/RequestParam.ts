export enum RequestParamTypes {
	Number,
	Single,
	Multiple
}
export type BasicRequestParam = {
	required: boolean
	name: string
	label: string
}
export type NumberRequestParam = BasicRequestParam & {
	type: RequestParamTypes.Number
	value: number
	restrictions: {
		min: number
		max: number
	}
}
export type SingleRequestParam = BasicRequestParam & {
	type: RequestParamTypes.Single
	value: string | null
	restrictions: {
		value: string
		label: string
	}[]
}
export type MultipleRequestParam = BasicRequestParam & {
	type: RequestParamTypes.Multiple
	values: {
		value: string
		label: string
		check: boolean
	}[]
}
export type RequestParam = NumberRequestParam | SingleRequestParam | MultipleRequestParam
