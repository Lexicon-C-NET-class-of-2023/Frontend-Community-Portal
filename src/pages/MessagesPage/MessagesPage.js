import React, { useState, useEffect } from 'react';
import { Fetch } from '../../services/fetch';
import { Error } from '../../components/Error/Error';
import { useParams } from 'react-router-dom';

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
	}, []) // <= dependency array (only happen once if empty)


	const getUsersMessages = () => {	//Where current user is either "userId" or "recipient"
		Fetch(`messages?userId=${userId}`)
			.then(res => {
				if (res?.error) setError(res.error);
				else setMessages(res)
			})
			.finally('reload')
			.catch(err => console.log(err))
	}


	return (
		<div>
			<h2>Messages</h2>
			<p>messages where current user is recipient are displayed on the right instead</p>
			<br />

			{error && <Error error={error} />}

			{messages &&
				<div>
					{messages.map((message) => {
						return (
							<div
								key={message.id}
								style={{
									display: 'flex',
									padding: 'var(--spacing)',
									gap: 'var(--spacing)',
									marginBottom: '10px',
									border: '1px solid blue',
									justifyContent: message.recipient === parseInt(userId) ? 'end' : 'start'
								}}
							>
								<p>id: {message.id}</p>
								<p>created: {message.created}</p>
								<p>userId: {message.userId}</p>
								<p>recipient: {message.recipient}</p>
								<p>content: {message.content}</p>
							</div>
						)
					})}
				</div>
			}
		</div>
	)
}