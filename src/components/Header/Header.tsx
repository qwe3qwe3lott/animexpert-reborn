import React from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/images/logo.webp';
import {NavLink} from 'react-router-dom';

const setActive = ({isActive}: { isActive: boolean }): string => isActive ? [styles.navLink, styles.activeNavLink].join(' ') : styles.navLink;

type NavButton = {
	label: string,
	path: string
}

class Header extends React.Component {
	navButtons: NavButton[];
	constructor(props: object) {
		super(props);
		this.navButtons = [
			{label: 'Home', path: '/'},
			{label: 'Review', path: '/review'},
			{label: 'TierList', path: '/tier'},
		];
	}
	render() {
		return (<>
			<header className={styles.header}>
				<button className={styles.logo}>
					<img alt="logo" src={logo} className={styles.logoImage}/>
					<p className={styles.logoTitle}>AnimExpert</p>
				</button>
				<div className={styles.auth}>auth</div>
				<nav className={styles.nav}>
					{this.navButtons.map((navButton, key) => (
						<NavLink key={key} className={setActive} to={navButton.path}>
							<span className={styles.navLabel}>{navButton.label}</span>
							<span className={styles.navSpan}/>
						</NavLink>
					))}
				</nav>
			</header>
		</>);
	}
}

export default Header;
