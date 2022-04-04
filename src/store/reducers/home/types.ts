export enum HomeActionTypes {
	RANDOM_GREETING = 'RANDOM_GREETING'
}
type RandomGreetingAction = {
	type: HomeActionTypes.RANDOM_GREETING
};
export type HomeAction = RandomGreetingAction
export type HomeState = {
	greetings: string[]
	greeting: string
}
