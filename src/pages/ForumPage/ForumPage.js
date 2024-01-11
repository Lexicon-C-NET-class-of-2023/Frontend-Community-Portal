import React, { useEffect, useState } from 'react'
import { Fetch } from '../../services/fetch';
import ForumCreate from '../../components/ForumCreate/ForumCreate';
import { useParams } from 'react-router-dom'
import ForumPost from '../../components/ForumPost/ForumPost';


export default function ForumPage() {
	const [error, setError] = useState();
	const [forums, setForums] = useState();
	const [value, setValue] = useState({ content: '' });
	const params = useParams()


	useEffect(() => { getForumPosts() }, [])


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


	const postForumAnswere = (forumId) => {
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

	const handleAnsweres = ({ target }) => setValue({ ...value, [target.name]: target.value })


	return (
		<div>
			<ForumCreate />

			<br />

			{forums && forums.map(({ id, title, forumPosts }) => (
				<ForumPost
					key={id}
					id={id}
					title={title}
					value={value}
					forumPosts={forumPosts}
					handleAnsweres={handleAnsweres}
					postForumAnswere={postForumAnswere}
				/>
			))}
		</div>
	)
}