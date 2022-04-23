import React from 'react';

import styles from './AuthPage.module.scss';

const AuthPage: React.FC = () => {
	return (<section className={styles.section}>
		<div>
			<h1 className={styles.title}>Для доступа к функционалу авторизируйтесь</h1>
			<ul className={styles.list}>
				<ol className={styles.element}>Получите код авторизации (нажмите на &quot;Получить код&quot; или на изображение ключа).</ol>
				<ol className={styles.element}>Зайдите в свой аккаунта на Shikimori.</ol>
				<ol className={styles.element}>Скопируйте код авторизации и введите его в поле для кода авторизации.</ol>
			</ul>
		</div>
	</section>);
};

export default AuthPage;
