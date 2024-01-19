import React from 'react'
import Proptypes from 'prop-types'
import styles from './clickabletext.module.css'


export const ClickableText = ({ children, onClick, title }) => (
	<p onClick={onClick} className={styles.clickabletext}>{title || children}</p>
)

ClickableText.propTypes = {
	onClick: Proptypes.func.isRequired
}