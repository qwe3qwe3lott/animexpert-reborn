import React from 'react';

import styles from './HomePage.module.scss';
import {Link} from 'react-router-dom';

const HomePage: React.FC = () => {
	return (<section className={styles.section}>
		<div className={styles.layout}>
			<h1 className={styles.title}>Инструменты</h1>
			<Link className={styles.button} to={'/review'}>Рулетка</Link>
			<Link className={styles.button} to={'/tier'}>Анализатор</Link>
		</div>
	</section>);
};

export default HomePage;
