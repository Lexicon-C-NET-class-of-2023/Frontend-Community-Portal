import React from 'react'


export const MessageTimestamp = ({ children, userIsSender }) => (
	<p style={{ color: '#333333' }}>{userIsSender ? 'sent:' : 'recieved:'} {children}</p>
)