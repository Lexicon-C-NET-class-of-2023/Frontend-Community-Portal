import React, { useEffect, useState } from 'react' /* <= imports, (React & react hooks) */
import styles from './homepage.module.css'
import { Fetch } from '../../services/fetch'


export default function HomePage() {
	const [users, setUsers] = useState() /* <= state (values ment to update the component when changed)*/
	const [error, setError] = useState()

	useEffect(() => {
		getUsers()
	}, []) // <= dependency array (only happen once if empty)

	const getUsers = () => {
		Fetch('users')
			.then(res => {
				if (res.error) setError(res.error);
				else setUsers(res)
			})
			.finally('reload')
			.catch(err => console.log(err))
	}


	return (
		<div className={styles.homepage}>
			<h1>Welcome</h1>

			{error && <p>{error.message} {error.statusText}</p>}  {/* <= conditional rendering (only shows if "error" is defined) */}

			{users &&
				<div>
					{
						users.map((user, i) => {
							const { firstName, lastName, email, created } = user /* <= destructuring */

							return (
								<div
									key={i} /* <= React requires a unique "key" property on the first child of a map() */
									className={styles.user}
								>
									<p>user: {`${firstName} ${lastName}`}</p> {/* <= template literal (handles variables as string)*/}
									<p>email: {email}</p>
									<p>created: {created}</p>
								</div>
							)
						})
					}
				</div>
			}
		</div >
	)
}