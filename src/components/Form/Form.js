import React from 'react'
import PropTypes from 'prop-types'
import styles from './form.module.css'
import { ButtonContainer } from '../ButtonContainer/ButtonContainer';
import { Button } from '../Button/Button';


export default function Form({ title, action, method, encType, children, handleSubmit, handleReset, disabled, fullWidth, gutterBottom }) {
	return (
		<form
			className={`${styles.form} ${fullWidth && styles.fullWidth} ${gutterBottom && styles.gutterBottom}`} 
			action={action}
			method={method}
			encType={encType}
			onReset={handleReset}
			onSubmit={handleSubmit}
		>
			<h2>{title}</h2>
			{children}

			<ButtonContainer>
				<Button type='reset' value='Ångra' />
				<Button type='submit' value='Skicka' disabled={disabled} />
			</ButtonContainer>
		</form>
	)
}

Form.propTypes = {
	title: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleReset: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired
};

Form.defaultProps = {
	method: 'POST'
}