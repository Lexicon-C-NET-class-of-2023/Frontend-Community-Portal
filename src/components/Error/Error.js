import React from 'react'
import styles from './error.module.css'

export const Error = ({ error }) => <div className={styles.error}><p>{`${error.message}: ${error.statusText}`}</p></div>