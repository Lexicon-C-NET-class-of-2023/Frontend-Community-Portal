import React from 'react'
import PropTypes from 'prop-types'
import Input from '../Input/Input'
import { Button } from '../Button/Button'


export default function MessageCreate({ handleChange, onClick }) {
	return (
		<div style={{ display: 'flex', gap: 16 }}>
			<Input
				type='text'
				name='content'
				placeholder='Nytt meddelande'
				// value={value.content}
				onChange={handleChange}
			/>
			<Button onClick={onClick}>Skicka</Button>
		</div>
	)
}

MessageCreate.propTypes = {
	handleChange: PropTypes.func.isRequired,
	onClick: PropTypes.func.isRequired
};