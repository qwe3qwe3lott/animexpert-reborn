import React from 'react';
import {Outlet} from 'react-router-dom';

import styles from './MainLayout.module.scss';

import Header from '../Header';
import Footer from '../Footer';

class MainLayout extends React.Component {
	render() {
		return (<>
			<Header />
			<main className={styles.main}>
				<Outlet/>
			</main>
			<Footer/>
		</>);
	}
}

export default MainLayout;
