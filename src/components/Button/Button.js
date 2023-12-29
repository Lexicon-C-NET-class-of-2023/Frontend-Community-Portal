import React from 'react'
import styles from './button.module.css'

export const Button = ({ type, value, children, disabled }) => (
	<button type={type} disabled={disabled} className={styles.button}>{value || children}</button>
)