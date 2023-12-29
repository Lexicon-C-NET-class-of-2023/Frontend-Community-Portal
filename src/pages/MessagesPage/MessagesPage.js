import React, { useState, useEffect } from 'react';
import { Fetch } from '../../services/fetch';
import { Error } from '../../components/Error/Error';
import { useParams, NavLink, Outlet } from 'react-router-dom';
import styles from './messagespage.module.css'


//TODO get all users the current user is chatting with
//TODO present their name as links with route to conversation
//TODO in new link make it possible to answere to the other user
//TODO service that handles the timestamp
//TODO a function that sends a request and get only messages between user and recipient  

export default function MessagesPage() {
	const [messages, setMessages] = useState() /* <= state (values ment to update the component when changed)*/
	const [error, setError] = useState()
	const { userId } = useParams();


	useEffect(() => {
		getUsersMessages()
		return () => getUsersMessages() // <= cleanup function (happens when the component unmount)
	}, []) // <= dependency array (only happen once if empty)


	const getUsersMessages = () => {	//Where current user is either "userId" or "recipient"
		Fetch(`messages?userId=${userId}`)
			.then(res => {
				if (res?.error) setError(res.error);
				else setMessages(res)
			})
			.catch(err => console.log(err))
	}


	return (
		<div className={styles.messagespage}>
			{error && <Error error={error} />}

			{messages &&
				<div className={styles.correspondants}>
					<h3>Correspondants</h3>
					<br />
					{messages.map((message) => {
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
					})}
				</div>
			}

			<Outlet />


		</div>
	)
}