import {randomElement} from '../../../util/randomElement';
import {OtherAction, OtherActionTypes, OtherState} from './types';

const initialState: OtherState = {
	greetings: [
		'Привет, тебе тут не рады!',
		'Всё, я уже от тебя кринжую',
		'Потом продолжим, я делами занят',
		'Прости, но у тебя iq меньше 80, иди отсюда',
		'У тебя одна извилина на двоих штоле?',
		'Ты то куда лезешь, мальчик',
		'Повторяй это почаще, попущ',
		'Да не, твоя отсталость уже даже не смешит',
		'Шоколад говном тоже не станет',
		'Отсталый...',
		'Повторяй это почаще, чмище'
	],
	greeting: '',
	message: null
};
export const otherReducer = (state = initialState, action: OtherAction): OtherState => {
	switch (action.type) {
	case OtherActionTypes.RANDOM_GREETING:
		return {...state, greeting: randomElement(state.greetings)};
	case OtherActionTypes.SET_MESSAGE:
		return {...state, message: action.payload};
	default:
		return state;
	}
};
