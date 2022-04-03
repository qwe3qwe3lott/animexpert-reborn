import React from 'react';

import image from '../../assets/images/homePage.webp';

import styles from './HomePage.module.scss';
import {randomElement} from '../../util/randomElement';

class HomePage extends React.Component {
	greetings: string[];
	constructor(props: object) {
		super(props);
		this.greetings = [
			'Привет, тебе тут не рады!',
			'Всё, я уже от тебя кринжую',
			'Потом продолжим, я делами занят',
			'Прости, но у тебя iq меньше 80, иди отсюда',
			'У тебя одна извилина на двоих штоле?',
			'Ты то куда лезешь мальчик',
			'Повторяй это почаще, попущ',
			'Да не, твоя отсталость уже даже не смешит',
			'Шоколад говном тоже не станет',
			'Отсталый...',
			'Повторяй это почаще, чмище',
		];
	}
	render() {
		return (<>
			<section className={styles.section}>
				<h1 className={styles.title}>{randomElement(this.greetings)}</h1>
				<img className={styles.image} alt="anime__zabanili" src={image}/>
			</section>
		</>);
	}
}

export default HomePage;
