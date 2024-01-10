import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './navbar.module.css';
import { UserAuth } from '../../context/AuthContext';
import AdminMenu from '../AdminMenu/AdminMenu';


export default function Navbar() {
	const auth = UserAuth();
	const admin = auth?.user?.admin;
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
							Hem
						</NavLink>
					</li>
					<li>
						<NavLink
							to={`messages/${userId}`}
							style={({ isActive }) => ({
								color: isActive ? 'white' : '#485F73',
								textDecoration: 'none'
							})}>
							Meddelanden
						</NavLink>
					</li>
					<li>
						<NavLink
							to={`forums/${userId}`}
							style={({ isActive }) => ({
								color: isActive ? 'white' : '#485F73',
								textDecoration: 'none'
							})}>
							Forum
						</NavLink>
					</li>
				</ul>
			</nav>

			<div style={{ display: 'flex', gap: 16 }}>
				{admin && <AdminMenu />}
				<p style={{ color: 'white' }} onClick={() => auth.logout()}>
					Log out
				</p>
			</div>
		</div>
	)
}