import React, {FormEvent, useState} from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/images/logo.webp';
import {Link, NavLink} from 'react-router-dom';

type NavButton = {
	label: string,
	path: string
}

const Header: React.FC = () => {
	const navButtons: NavButton[] = [
		{label: 'Главная', path: '/'},
		{label: 'Японская рулетка', path: '/review'},
		{label: 'Анализатор ущербности', path: '/tier'},
	];

	const setActive = ({isActive}: { isActive: boolean }): string =>
		isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink;

	const [isAuth] = useState(false);

	const signIn = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	return (<>
		<header className={styles.header}>
			<Link to="/" className={styles.logo}>
				<img alt="logo" src={logo} className={styles.logoImage}/>
				<p className={styles.logoTitle}>AnimExpert</p>
			</Link>
			<form className={styles.auth} onSubmit={signIn}>
				{!isAuth ?
					<>
						<a target={'_blank'} href={process.env.REACT_APP_AUTHORIZATION_CODE_LINK} className={styles.keyLink} rel="noreferrer" />
						<input type={'password'} className={styles.authInput}/>
					</>:
					<button type={'button'}>
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
		</header>
	</>);
};

export default Header;
