import React from 'react'
import styles from './messagetimestamp.module.css'

export const MessageTimestamp = ({ children, userIsSender }) => (
	<p className={styles.messagetimestamp}>{userIsSender ? 'skickat:' : 'mottaget:'} {children}</p>
)