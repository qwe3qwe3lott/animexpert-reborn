import {ModalMessage} from '../../../types/ModalMessage';

export enum OtherActionTypes {
	SET_MESSAGE = 'SET_MESSAGE'
}
export type SetMessageOtherAction = {
	type: OtherActionTypes.SET_MESSAGE
	payload: ModalMessage | null
}
export type OtherAction = SetMessageOtherAction
export type OtherState = {
	message: ModalMessage | null
}
