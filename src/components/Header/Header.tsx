import React from 'react';
import {NavLink} from 'react-router-dom';

import styles from './Header.module.scss';

const setActive = ({isActive}: { isActive: boolean }): string => isActive ? styles.activeNavLink : '';

class Header extends React.Component {
	render() {
		return (<>
			<header className={styles.header}>
				<div className={styles.logo}>logo</div>
				<div className={styles.auth}>auth</div>
				<nav className={styles.nav}>
					<NavLink className={setActive} to="/">Home</NavLink>
					<NavLink className={setActive} to="/review">Review</NavLink>
					<NavLink className={setActive} to="/tier">Tier</NavLink>
				</nav>
			</header>
		</>);
	}
}

export default Header;
