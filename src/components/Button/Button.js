import React from 'react'
import styles from './button.module.css'

export const Button = ({ type, value, children }) => <button type={type} className={styles.button}>{value || children}</button>