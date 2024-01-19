import React, { useEffect, useState } from 'react'
import { Fetch } from '../../services/fetch';
import ForumCreate from '../../components/ForumCreate/ForumCreate';
import { useParams } from 'react-router-dom'
import ForumPost from '../../components/ForumPost/ForumPost';
import { ClickableText } from '../../components/ClickableText/ClickableText';


export default function ForumPage() {
	const [error, setError] = useState();
	const [forums, setForums] = useState();
	const [showForumCreate, setShowForumCreate] = useState(false);
	const [value, setValue] = useState({ content: '' });
	const params = useParams()


	useEffect(() => { getForumPosts() }, [])


	const handleReplies = ({ target }) => setValue({ ...value, [target.name]: target.value })
	const toggleForumCreate = () => setShowForumCreate(!showForumCreate)

	const getForumPosts = () => {
		Fetch('forums')
			.then(res => {
				if (res?.error) setError(res.error);
				else {
					// console.log(res)
					setForums(res)
				}
			})
			.finally('reload')
			.catch(err => console.log(err))
	}

	const postForumReplies = (forumId) => {
		if (!value.content) return

		Fetch(`forums/${forumId}/posts/${params.userId}`, 'ForumPage', 'POST', value)
			.then(res => {
				if (res?.error) setError(res.error);
				else {
					console.log(res);
					// setFb(feedback.register)
					getForumPosts();
				}
			})
			.catch(err => console.log(err))
	}




	return (
		<div>
			{showForumCreate ?
				<ForumCreate toggleForumCreate={toggleForumCreate} />
				:
				<ClickableText
					title='Starta en ny forumtråd'
					onClick={toggleForumCreate}
				/>
			}

			<br />

			{forums && forums.map(({ id, title, forumPosts }) => (
				<ForumPost
					key={id}
					id={id}
					title={title}
					value={value}
					forumPosts={forumPosts}
					handleReplies={handleReplies}
					postForumReplies={postForumReplies}
				/>
			))}
		</div>
	)
}