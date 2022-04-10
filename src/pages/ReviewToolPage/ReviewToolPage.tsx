import React from 'react';
import ReviewRequestManager from '../../components/ReviewRequestManager';

import styles from './ReviewToolPage.module.scss';
import ReviewForm from '../../components/ReviewForm';

const ReviewToolPage: React.FC = () => {
	console.log('ReviewToolPage', 'render');

	return (<section className={styles.section}>
		<ReviewRequestManager className={styles.manager}/>
		<ReviewForm className={styles.form}/>
	</section>);
};

export default ReviewToolPage;
