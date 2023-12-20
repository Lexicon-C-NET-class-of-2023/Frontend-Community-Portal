import React from 'react'
import PropTypes from 'prop-types'
import styles from './form.module.css'
import { ButtonContainer } from '../ButtonContainer/ButtonContainer';
import { Button } from '../Button/Button';


export default function Form({ action, method, encType, children, handleSubmit, handleReset }) {
	return (
		<form
			className={styles.form}
			action={action}
			method={method}
			encType={encType}
			onReset={handleReset}
			onSubmit={handleSubmit}
		>
			{children}

			<ButtonContainer>
				<Button type='reset' value='Ångra' />
				<Button type='submit' value='Skicka' />
			</ButtonContainer>
		</form>
	)
}

Form.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	handleReset: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired
};

Form.defaultProps = {
	method: 'POST'
}