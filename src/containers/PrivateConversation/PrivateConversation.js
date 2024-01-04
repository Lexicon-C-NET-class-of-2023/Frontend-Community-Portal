import React, { useEffect, useState } from 'react'
import styles from './privateconversation.module.css'
import { useParams } from 'react-router-dom'
import { Fetch } from '../../services/fetch'
import Message from '../../components/Message/Message'
import { MessageContainer } from '../../components/MessageContainer/MessageContainer'
import { MessageTimestamp } from '../../components/MessageTimestamp/MessageTimestamp'
import { Feedback } from '../../components/Feedback/Feedback'
import MessageCreate from '../../components/MessageCreate/MessageCreate'
import { handleChange } from '../../services/handleChange'


export default function PrivateConversation() {
	const { userId, recipientId } = useParams();
	const [messages, setMessages] = useState()
	const [error, setError] = useState()
	const [reloadConversation, setReloadConversation] = useState({})
	const [value, setValue] = useState({ recipient: null, content: '' })


	useEffect(() => {
		setValue({ ...value, recipient: recipientId })

		Fetch(`messages/${userId}/message/${recipientId}`)
			.then(res => {
				if (res?.error) setError(res.error);
				else setMessages(res)
			})
			.catch(err => console.log(err))
	}, [userId, recipientId, reloadConversation])


	const sendMessage = () => {
		Fetch(`messages/${userId}`, 'PrivateConversation', 'POST', value)
			.then(res => {
				if (res?.error) setError(res.error);
				else setReloadConversation({})
			})
			.catch(err => console.log(err))
	}


	return (
		<div className={styles.privateconversation}>
			<h3>Messages</h3>
			<br />
			{error && <Feedback error={error} />}
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

			<MessageCreate
				value={value}
				handleChange={(e) => handleChange(e, value, setValue)}
				onClick={sendMessage}
			/>

		</div >
	)
}