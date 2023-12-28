import React, { useEffect, useState } from 'react'
import styles from './privateconversation.module.css'
import { useParams } from 'react-router-dom';
import { Fetch } from '../../services/fetch';

export default function PrivateConversation() {
	const [messages, setMessages] = useState()
	const [error, setError] = useState()
	const { userId, recipientId } = useParams();

	useEffect(() => {

		console.log(messages);

	}, [messages])


	useEffect(() => {
		getUsersMessages()

	}, [recipientId])


	const getUsersMessages = () => {
		//{userId}/message/{recipientId}

		Fetch(`messages/${userId}/message/${recipientId}`)
			.then(res => {
				if (res?.error) setError(res.error);
				else setMessages(res)
				// console.log(messages);
			})
			.finally('reload')
			.catch(err => console.log(err))
	}



	return (
		<div className={styles.privateconversation}>
			{messages &&
				<div className={styles.correspondants}>
					<h3>Messages</h3>
					<br />
					{messages.map((message) => {
						const userIsSender = parseInt(userId) === message.userId;

						return (
							<div //conversation
								key={message.id}
								style={{
									display: 'flex',
									flexDirection: 'column',
									marginBlock: 'var(--spacing)',
									alignItems: userIsSender ? 'start' : 'end'
								}}>

								<p style={{ color: '#333333' }}>
									{userIsSender ? 'sent:' : 'recieved:'} {message.created} {/* timestamp */}
								</p> 

								<div //message
									style={{
										width: 'fit-content',
										padding: 'var(--spacing)',
										border: `1px solid ${userIsSender ? 'black' : 'white'}`,
										borderRadius: 40,
										borderBottomRightRadius: userIsSender ? 40 : 3,
										borderBottomLeftRadius: userIsSender ? 3 : 40
									}}>
									<p>sender: {message.userId}</p>
									<p>recipient: {message.recipient}</p>
									<p>content: {message.content}</p>
								</div>
							</div>
						)
					})}
				</div>
			}
		</div>
	)
}