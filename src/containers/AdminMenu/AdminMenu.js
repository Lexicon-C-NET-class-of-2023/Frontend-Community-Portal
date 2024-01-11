import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';



const DropdownMenu = ({ title, children }) => {
	const [activeMenu, setActiveMenu] = useState(false);

	const toggleMenu = () => setActiveMenu(!activeMenu);


	return (
		<div>
			<button onClick={toggleMenu}>{title}</button>

			{activeMenu &&

				<ul style={{
					position: 'absolute',
					flexDirection: 'column',
					gap: 16,
					background: 'red',
					padding: 'var(--spacing)',
					marginTop: 10
				}}>
					{children}
				</ul>
			}
		</div>
	)
}


const DropdownItem = ({ children }) => {
	return (
		<div>
			<li>
				{children}
			</li>
		</div>
	)
}


function AdminMenu() {



	return (
		<div >
			<DropdownMenu title = 'Admin'>
				<DropdownItem>
					<NavLink
						to={`news`}
						style={({ isActive }) => ({
							color: isActive ? 'white' : '#485F73',
							textDecoration: 'none'
						})}>
						Nyheter
					</NavLink>
				</DropdownItem>

				<DropdownItem>
					<p>Test</p>
				</DropdownItem>
			</DropdownMenu>
		</div>
	);
}

export default AdminMenu;