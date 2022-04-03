import React from 'react';
import {NavLink} from 'react-router-dom';

import styles from './Header.module.scss';
import logo from '../../assets/images/logo.webp';

const setActive = ({isActive}: { isActive: boolean }): string => isActive ? [styles.navLink, styles.activeNavLink].join(' ') : styles.navLink;

class Header extends React.Component {
	render() {
		return (<>
			<header className={styles.header}>
				<div className={styles.logo}><img alt="logo" src={logo} className={styles.logoImage}/></div>
				<div className={styles.auth}>auth</div>
				<nav className={styles.nav}>
					<NavLink className={setActive} to="/"><span>Home</span><span className={styles.navSpan}/></NavLink>
					<NavLink className={setActive} to="/review"><span>Review</span><span className={styles.navSpan}/></NavLink>
					<NavLink className={setActive} to="/tier"><span>TierList</span><span className={styles.navSpan}/></NavLink>
				</nav>
			</header>
		</>);
	}
}

export default Header;
