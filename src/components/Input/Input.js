import React from 'react'

export default function Input({ name, type, placeholder, value }) {
	return (
		<input
			type={type}
			name={name}
			placeholder={placeholder}
			value={value}
		/>
	)
}
