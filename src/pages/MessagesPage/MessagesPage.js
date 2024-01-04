import React, { useState, useEffect } from 'react';
import { Fetch } from '../../services/fetch';
import { Feedback } from '../../components/Feedback/Feedback';
import { useParams, NavLink, Outlet } from 'react-router-dom';
import styles from './messagespage.module.css'


export default function MessagesPage() {
	const [messages, setMessages] = useState() /* <= state (values ment to update the component when changed)*/
	const [error, setError] = useState()
	const { userId } = useParams();


	useEffect(() => {
		Fetch(`messages?userId=${userId}`)
			.then(res => {
				if (res?.error) setError(res.error);
				else setMessages(res)
			})
			.catch(err => console.log(err)) // <= cleanup function (happens when the component unmount)
	}, []) // <= dependency array (only happen once if empty)


	return (
		<div className={styles.messagespage}>
			{error && <Feedback error={error} />}

			{messages &&
				<div className={styles.correspondants}>
					<h3>Correspondants</h3>
					<br />
					{messages.length < 1 ?
						<p>Du har inte startat några konversationer än</p>
						:
						messages.map((message) => {
							const { id, recipient, recipientName, senderName } = message;
							const userIsSender = parseInt(userId) === message.userId;

							return (
								<NavLink
									key={id}
									to={`message/${userIsSender ? recipient : message.userId}`}
									style={({ isActive }) => ({
										color: isActive ? 'var(--link-active-color)' : 'var(--link-color)'
									})}>
									<p>{userIsSender ?
										recipientName
										:
										senderName
									}
									</p>
								</NavLink>
							)
						})
					}
				</div>
			}

			<Outlet />

		</div>
	)
}