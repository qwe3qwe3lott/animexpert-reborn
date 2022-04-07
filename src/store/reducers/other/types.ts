export enum OtherActionTypes {
	RANDOM_GREETING = 'RANDOM_GREETING',
	SET_MESSAGE = 'SET_MESSAGE'
}
export type RandomGreetingOtherAction = {
	type: OtherActionTypes.RANDOM_GREETING
};
export type SetMessageOtherAction = {
	type: OtherActionTypes.SET_MESSAGE
	payload: string | null
}
export type OtherAction = RandomGreetingOtherAction | SetMessageOtherAction
export type OtherState = {
	greetings: string[]
	greeting: string
	message: string | null
}
