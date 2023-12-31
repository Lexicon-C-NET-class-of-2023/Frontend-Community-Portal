import React, { useEffect, useState } from 'react'
import styles from './privateconversation.module.css'
import { useParams } from 'react-router-dom'
import { Fetch } from '../../services/fetch'
import Message from '../../components/Message/Message'
import { MessageContainer } from '../../components/MessageContainer/MessageContainer'
import { MessageTimestamp } from '../../components/MessageTimestamp/MessageTimestamp'
import { Error } from '../../components/Error/Error'


export default function PrivateConversation() {
	const [messages, setMessages] = useState()
	const [error, setError] = useState()
	const { userId, recipientId } = useParams();


	useEffect(() => {
		getUsersMessages()
		return () => getUsersMessages()
	}, [recipientId])


	const getUsersMessages = () => {
		Fetch(`messages/${userId}/message/${recipientId}`)
			.then(res => {
				if (res?.error) setError(res.error);
				else setMessages(res)
			})
			.catch(err => console.log(err))
	}


	return (
		<div className={styles.privateconversation}>
			<h3>Messages</h3>
			<br />
			{error && <Error error={error} />}
			{messages &&
				<div className={styles.correspondants}>
					{messages.map((message) => {
						const userIsSender = parseInt(userId) === message.userId;

						return (
							<MessageContainer
								key={message.id}
								userIsSender={userIsSender}
							>
								<MessageTimestamp userIsSender={userIsSender}>
									{message.created}
								</MessageTimestamp>
								<Message userIsSender={userIsSender} >
									<p>sender: {message.userId}</p>
									<p>recipient: {message.recipient}</p>
									<p>content: {message.content}</p>
								</Message>
							</MessageContainer>
						)
					})}
				</div>
			}
		</div >
	)
}