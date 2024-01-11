import React from "react"
import { formatHelper } from "../../services/formatHelper"
import styles from './forumcomment.module.css'


export default function ForumComment({ post, original }) {
	return (
		<div className={styles.forumcomment}>
			<div className={styles.timestamp}> <p>{formatHelper.timestamp(post.created)}</p> </div>
			<div className={!original ? styles.content : ''}> <p>{post.content}</p> </div>
		</div>
	)
}