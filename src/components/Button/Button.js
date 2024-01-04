import React from 'react'
import styles from './button.module.css'

export const Button = ({ type, value, children, onClick, disabled }) => (
	<button type={type} disabled={disabled} className={styles.button} onClick={onClick}>{value || children}</button>
)