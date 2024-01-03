import React, { useEffect, useState } from 'react'
import styles from './feedback.module.css'

const timer = 3000


export const Feedback = ({ error, feedback }) => {
	const [close, setClose] = useState(false);

	useEffect(() => {
		setTimeout(() => { setClose(true) }, timer)
		return () => setTimeout(() => { setClose(true) }, timer)
	}, [])

	if (close) return null

	if (feedback) return (
		<div className={`${styles.feedback} ${styles.ok}`}>
			<h3>{feedback}</h3>
		</div>
	)

	if (error) return (
		<div className={`${styles.feedback} ${styles.error} `}>
			<h3>{`${error.message}: ${error.statusText}`}</h3>
		</div>
	)
}