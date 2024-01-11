import React, { useState } from 'react'
import Form from '../Form/Form'
import Input from '../Input/Input'
import { handleChange } from '../../services/handleChange'
import { useParams } from 'react-router-dom'
import { Fetch } from '../../services/fetch'
import { feedback } from '../../services/feedback'
import { Feedback } from '../Feedback/Feedback'



// TODO Not able to reset textarea
// TODO Feedback
export default function ForumCreate() {
	const [error, setError] = useState();
	const [fb, setFb] = useState();
	const [value, setValue] = useState({ title: '', posts: [{ content: '' }] });
	const params = useParams()


	const temp = ({ target }) => handleChange({ target }, value, setValue)
	const resetForm = () => setValue({ title: '', posts: [{ content: '' }] })

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
				title='Skriv ett foruminlägg'
				handleSubmit={createForumPost}
				handleReset={resetForm}
			>
				<Input
					type='text'
					label='Titel'
					name='title'
					placeholder='Ange titel'
					value={value.title}
					onChange={temp}
					minLength={4}
				/>

				<textarea
					name='content'
					value={value.content}
					onChange={temp}
				>
				</textarea>
			</Form>
		</div>
	)
}