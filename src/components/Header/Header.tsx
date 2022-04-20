import React, {FormEvent, useState} from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/images/logo.webp';
import {Link, NavLink} from 'react-router-dom';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {authService} from '../../api/AuthService';

type NavButton = {
	label: string,
	path: string
}

const Header: React.FC = () => {
	console.log('Header', 'render');
	const navButtons: NavButton[] = [
		{label: 'Запросы', path: '/requests'},
		{label: 'Списки', path: '/lists'},
		{label: 'Рулетка', path: '/review'},
		{label: 'Анализатор', path: '/tier'}
	];

	const setActive = ({isActive}: { isActive: boolean }): string =>
		isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink;

	const {auth} = useTypedSelector((state) => state.auth);

	const [authorizationCode, changeAuthorizationCode] = useState('');

	const logIn = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!authorizationCode) return;
		authService.logIn(authorizationCode);
	};

	return (<header className={styles.header}>
		<Link to="/" className={styles.logo}>
			<img alt="logo" src={logo} className={styles.logoImage}/>
			<p className={styles.logoTitle}>AnimExpert</p>
		</Link>
		<form className={styles.auth} onSubmit={logIn}>
			{!auth ?
				<>
					<a target={'_blank'} href={process.env.REACT_APP_AUTHORIZATION_CODE_LINK} className={styles.keyLink} rel="noreferrer">Получить код</a>
					<input value={authorizationCode} onChange={(event) => changeAuthorizationCode(event.target.value)} type={'password'} className={styles.authInput}/>
				</>:
				<button type={'button'} onClick={() => authService.logOut()}>
						Выйти
				</button>
			}
		</form>
		<nav className={styles.nav}>
			{navButtons.map((navButton, key) => (
				<NavLink key={key} className={setActive} to={navButton.path}>
					<span className={styles.navLabel}>{navButton.label}</span>
					<span className={styles.navSpan}/>
				</NavLink>
			))}
		</nav>
	</header>);
};

export default Header;
