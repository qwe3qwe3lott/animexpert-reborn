import {RequestParamTypes} from '../../types/RequestParam';

export type RequestBasicChangeEvent = {
	requestId: number
	paramName: string
}
export type RequestNumberChangeEvent = RequestBasicChangeEvent & {
	type: RequestParamTypes.Number,
	value: number
}
export type RequestSingleChangeEvent = RequestBasicChangeEvent & {
	type: RequestParamTypes.Single,
	value: string
}
export type RequestMultipleChangeEvent = RequestBasicChangeEvent & {
	type: RequestParamTypes.Multiple,
	value: {
		valueOfValues: string,
		flag: boolean
	}
}
export type RequestChangeEvent = RequestNumberChangeEvent |
	RequestSingleChangeEvent | RequestMultipleChangeEvent
