import {randomElement} from '../../../util/randomElement';
import {HomeAction, HomeActionTypes, HomeState} from './types';

const initialState: HomeState = {
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
		'Повторяй это почаще, чмище',
	],
	greeting: '',
};
export const homeReducer = (state = initialState, action: HomeAction) => {
	switch (action.type) {
	case HomeActionTypes.RANDOM_GREETING:
		return {...state, greeting: randomElement(state.greetings)};
	default:
		return state;
	}
};
