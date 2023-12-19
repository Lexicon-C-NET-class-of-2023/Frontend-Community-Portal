import React, { useState, useEffect } from 'react';
import { Fetch } from '../../services/fetch';
import Input from '../../components/Input/Input';


export default function MessagesPage() {
	const [messages, setMessages] = useState() /* <= state (values ment to update the component when changed)*/
	const [error, setError] = useState()

	useEffect(() => {
		getUsersMessages()
	}, []) // <= dependency array (only happen once if empty)

	const getUsersMessages = () => {
		Fetch('messages/?userId=1')
			.then(res => {
				console.log(res);
				if (res?.error) setError(res.error);
				else setMessages(res)
			})
			.finally('reload')
			.catch(err => console.log(err))
	}

	return (
		<div>
			<Input
				type="text"
				placeholder="first name"
			/>
			<Input
				type="text"
				placeholder="last name"
			/>
		</div>
	)
}
