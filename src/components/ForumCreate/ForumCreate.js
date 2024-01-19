import React, { useState } from 'react'
import Form from '../Form/Form'
import Input from '../Input/Input'
import { handleChange } from '../../services/handleChange'
import { useParams } from 'react-router-dom'
import { Fetch } from '../../services/fetch'
import { feedback } from '../../services/feedback'
import { Feedback } from '../Feedback/Feedback'
import Textarea from '../Textarea/Textarea'




// TODO Feedback
export default function ForumCreate({ toggleForumCreate }) {
	const [error, setError] = useState();
	const [fb, setFb] = useState();
	const [value, setValue] = useState({ title: '', posts: [{ content: '' }] });
	const params = useParams()


	const temp = ({ target }) => handleChange({ target }, value, setValue)

	const createForumPost = (e) => {
		e.preventDefault();
		if (!value.content || !value.content) return;

		value.posts[0].content = value.content;
		delete value.content;

		Fetch(`forums/${params.userId}`, 'ForumPost', 'POST', value)
			.then(res => {
				if (res?.error) setError(res.error);
				else {
					console.log(res);
					setFb(feedback.register)
				}
			})
			.catch(err => console.log(err))
	}


	return (
		<div>
			<Feedback feedback={fb} error={error} />
			<Form
				// title='Ny forumtråd'
				handleSubmit={createForumPost}
				handleReset={toggleForumCreate}
				fullWidth
				gutterBottom
			>
				<Input
					type='text'
					label='Titel'
					name='title'
					placeholder='Ange titel'
					value={value.title}
					onChange={handleChange}
					minLength={4}
					maxLength='10px'
					block
				/>

				<Textarea
					name='content'
					value={value.posts[0].content}
					onChange={handleChange}
				/>
			</Form>
		</div>
	)
}