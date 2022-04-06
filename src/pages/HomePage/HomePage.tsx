import React, {useEffect} from 'react';

import image from '../../assets/images/homePage.webp';

import styles from './HomePage.module.scss';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'redux';
import {HomeActionTypes, HomeAction} from '../../store/reducers/home/types';

const HomePage: React.FC = () => {
	const homeDispatch: Dispatch<HomeAction> = useDispatch();

	useEffect(() => {
		homeDispatch({type: HomeActionTypes.RANDOM_GREETING});
	}, []);

	const {greeting} = useTypedSelector((state) => state.home);

	return (<section className={styles.section}>
		<h1 className={styles.title}>{`${greeting}`}</h1>
		<img className={styles.image} alt="anime__zabanili" src={image}/>
		<a className={styles.link} target="_blank" href="https://shikimori.one/anime__zabanili" rel="noreferrer">© anime__zabanili</a>
	</section>);
};

export default HomePage;
