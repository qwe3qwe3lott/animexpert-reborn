import React from 'react';
import {Outlet} from 'react-router-dom';

import styles from './MainLayout.module.scss';

import Header from '../Header';
import Footer from '../Footer';

import MessageDisplayer from '../MessageDisplayer';

const MainLayout: React.FC = () => {
	return (<>
		<MessageDisplayer/>
		<Header />
		<main className={styles.main}>
			<Outlet/>
		</main>
		<Footer/>
	</>);
};

export default MainLayout;
