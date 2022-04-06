import React, {FormEvent, useState} from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/images/logo.webp';
import {Link, NavLink} from 'react-router-dom';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {Dispatch} from 'redux';
import {AuthAction, AuthActionTypes} from '../../store/reducers/auth/types';
import {useDispatch} from 'react-redux';
import {authService} from '../../api/AuthService';

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

	const authDispatch: Dispatch<AuthAction> = useDispatch();
	const {auth} = useTypedSelector((state) => state.auth);

	const [authorizationCode, changeAuthorizationCode] = useState('');

	const signIn = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!authorizationCode) return;
		const auth = await authService.toAuth(authorizationCode);
		authDispatch({type: AuthActionTypes.SET_AUTH, payload: auth});
		localStorage.setItem('auth', JSON.stringify(auth));
	};

	const signOut = () => {
		authDispatch({type: AuthActionTypes.SET_AUTH, payload: null});
		localStorage.removeItem('auth');
	};

	return (<header className={styles.header}>
		<Link to="/" className={styles.logo}>
			<img alt="logo" src={logo} className={styles.logoImage}/>
			<p className={styles.logoTitle}>AnimExpert</p>
		</Link>
		<form className={styles.auth} onSubmit={signIn}>
			{!auth ?
				<>
					<a target={'_blank'} href={process.env.REACT_APP_AUTHORIZATION_CODE_LINK} className={styles.keyLink} rel="noreferrer" />
					<input value={authorizationCode} onChange={(event) => changeAuthorizationCode(event.target.value)} type={'password'} className={styles.authInput}/>
				</>:
				<button type={'button'} onClick={signOut}>
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
