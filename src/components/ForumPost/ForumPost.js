import React, { useState } from 'react'
import ForumComment from "../ForumComment/ForumComment";
import Input from "../Input/Input";
import styles from './forumpost.module.css';


const ForumPost = ({
	postForumReplies,
	handleReplies,
	forumPosts,
	title,
	value,
	id
}) => {
	const [showInput, setShowInput] = useState(false);
	const [showComments, setShowComments] = useState(false);

	const toggleAnswereButtonOrInputfield = () => setShowInput(!showInput);
	const toggleShowComments = () => {
		setShowComments(!showComments);
		if (showInput) toggleAnswereButtonOrInputfield();
	}


	return (
		<div className={styles.forumpost}>
			<h4>{title}</h4>

			<button onClick={toggleShowComments}>Visa kommentarer</button>

			{!showComments ?
				<p>{forumPosts[0].content}</p>

				:

				<>
					{forumPosts
						.sort((a, b) => b.created - a.created)
						.map((post, i) => (
							<ForumComment
								key={post.id}
								post={post}
								original={i === 0}
							/>
						))}

					{!showInput ?
						<button onClick={toggleAnswereButtonOrInputfield}>Svara</button>

						:

						<>
							<Input
								placeholder="enter"
								name="content"
								value={value.content}
								onChange={handleReplies}
								inputfieldWidth="100%"
							/>

							<button
								onClick={() => postForumReplies(id)}
								style={{ width: 'fit-content' }}
							>
								Skicka
							</button>
						</>

					}
				</>
			}
		</div>
	)
}

export default ForumPost;