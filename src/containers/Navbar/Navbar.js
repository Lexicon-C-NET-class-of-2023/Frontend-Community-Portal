import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './navbar.module.css';
import { UserAuth } from '../../context/AuthContext';


export default function Navbar() {
	const auth = UserAuth();
	const userId = auth?.user?.id;


	return (
		<div className={styles.navbar}>
			<nav>
				<ul>
					<li>
						<NavLink
							to='/'
							style={({ isActive }) => ({
								color: isActive ? 'white' : '#485F73',
								textDecoration: 'none'
							})}>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							to={`messages/${userId}`}
							style={({ isActive }) => ({
								color: isActive ? 'white' : '#485F73',
								textDecoration: 'none'
							})}>
							Messages
						</NavLink>
					</li>
				</ul>
			</nav>
			<p
				style={{ color: 'white' }}
				onClick={() => auth.logout()}
			>
				Log out
			</p>
		</div>
	)
}