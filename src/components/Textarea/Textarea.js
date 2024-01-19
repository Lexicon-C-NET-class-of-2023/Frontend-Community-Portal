import React from 'react'
import PropTypes from 'prop-types'
import styles from './textarea.module.css'

export default function Textarea({ name, title, value, onChange, fullWidth }) {
	return (
		<textarea
			className={styles.textarea}
			name={name}
			value={value || 'asdf'}
			onChange={onChange}
		>
		</textarea>
	)
}

Textarea.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
}