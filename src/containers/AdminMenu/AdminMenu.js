import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';


function AdminMenu() {
	const [activeMenu, setActiveMenu] = useState(false);


	const toggleMenu = () => setActiveMenu(!activeMenu);


	return (
		<div >
			<button onClick={toggleMenu}>Admin</button>

			{activeMenu &&
				<li style={{background:'orange'}}>
					<NavLink
						to={`news`}
						style={({ isActive }) => ({
							color: isActive ? 'white' : '#485F73',
							textDecoration: 'none'
						})}>
						Nyheter
					</NavLink>
				</li>
			}
		</div>
	);
}

export default AdminMenu;