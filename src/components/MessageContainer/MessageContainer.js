import React from 'react'
import styles from './messagecontainer.module.css'


export const MessageContainer = ({ children, userIsSender }) => (
	<div className={`${styles.messagecontainer} ${!userIsSender && styles.rightAligned}`}>{children}</div>
)