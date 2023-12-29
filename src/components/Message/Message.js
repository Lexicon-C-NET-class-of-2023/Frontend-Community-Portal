import React from "react"
import styles from './message.module.css'


export default function Message({ children, userIsSender }) {
	const { message, pointLeft, pointRight } = styles;
	return (
		<div className={`${message} ${!userIsSender && pointLeft} ${userIsSender && pointRight}`}>
			{children}
		</div>
	)
}