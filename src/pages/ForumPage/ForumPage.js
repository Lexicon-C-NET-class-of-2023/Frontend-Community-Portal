import React, { useEffect, useState } from 'react'
import { Fetch } from '../../services/fetch';




export default function ForumPage() {
	const [error, setError] = useState();
	const [forums, setForums] = useState();


	useEffect(() => {
		Fetch('forums')
			.then(res => {
				if (res?.error) setError(res.error);
				else {
					setForums(res)
					// console.log(res)
				}
			})
			.finally('reload')
			.catch(err => console.log(err))
	}, [])

	return (
		<div>
			<p>ForumPage</p>
			<br /><br />
			{forums &&
				forums.map((forum) => {
					const { id, title, forumPosts } = forum;
					const original = forumPosts[0];

					return (
						<div
							key={id}
							style={{ background: 'green', marginBottom: 10 }}
						>
							<h4>{title}</h4>

							{forumPosts
								.sort((a, b) => {
									console.log('a', a.created, 'b', b.created);

									return b.created - a.created
								})
								.map((post) => {
									// console.log(post);
									return (
										<div
											key={post.id}
											style={{ background: 'red', marginBottom: 10 }}
										>
											<p>{post.id}</p>
											<p>{post.created}</p>
											<p>{post.content}</p>
										</div>
									)
								})}

							<button>svara</button>
						</div>
					)
				})
			}
		</div>
	)
}