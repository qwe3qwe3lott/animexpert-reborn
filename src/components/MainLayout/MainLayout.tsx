import React, {useMemo} from 'react';
import {Outlet} from 'react-router-dom';

import styles from './MainLayout.module.scss';

import Header from '../Header';
import Footer from '../Footer';
import ModalWindow from '../ModalWindow';
import {Dispatch} from 'redux';
import {OtherAction, OtherActionTypes} from '../../store/reducers/other/types';
import {useDispatch} from 'react-redux';
import {useTypedSelector} from '../../hooks/useTypedSelector';

const MainLayout: React.FC = () => {
	const otherDispatch: Dispatch<OtherAction> = useDispatch();

	const {message} = useTypedSelector((state) => state.other);

	const showModal = useMemo(() => {
		return message !== null;
	}, [message]);

	return (<>
		{showModal && <ModalWindow onClose={() => otherDispatch({type: OtherActionTypes.SET_MESSAGE, payload: null})}>
			<p className={styles.message}>{message}</p>
			<button className={styles.button} onClick={() => otherDispatch({type: OtherActionTypes.SET_MESSAGE, payload: null})}>ОК</button>
		</ModalWindow>}
		<Header />
		<main className={styles.main}>
			<Outlet/>
		</main>
		<Footer/>
	</>);
};

export default MainLayout;
