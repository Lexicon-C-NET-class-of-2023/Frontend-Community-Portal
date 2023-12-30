import React, { useState } from 'react'
import Form from '../../components/Form/Form'
import Input from '../../components/Input/Input'
import { Fetch } from '../../services/fetch'
import { Error } from '../../components/Error/Error'
import { pattern } from '../../services/pattern'
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './registerpage.module.css'

const successMessage = 'Din registrering gick bra och du routas strax till login'


export default function RegisterPage() {
	const [error, setError] = useState()
	const [message, setMessage] = useState('')
	const [value, setValue] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: ''
	});
	const navigate = useNavigate();


	const passwordsMatch = () => value.password === value.confirmPassword;
	const onReset = () => setValue({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });

	const handleChange = ({ target }) => {
		target.setCustomValidity('');
		setValue({ ...value, [target.name]: target.value });
	}

	const customValidation = ({ target }) => {
		// console.log(target.name, target.validity);
	}

	const registerUser = () => {
		Fetch('users', 'RegisterPage', 'POST', value)
			.then(res => {
				if (res?.error) setError(res.error);
				else {
					setMessage(successMessage)
					setTimeout(() => { navigate('../login') }, 3000)
				}
			})
			.catch(err => console.log(err))
	}

	const onSubmit = (e) => {
		e.preventDefault();
		registerUser();
	}


	return (
		<div className={styles.registerpage}>
			{error && <Error error={error} />}
			{message && <p>{message}</p>}

			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<Form
					title='Registrera nytt konto'
					handleSubmit={onSubmit}
					handleReset={onReset}
				>
					<Input
						type='text'
						label='Förnamn'
						name='firstName'
						placeholder='Erik'
						value={value.firstName}
						onChange={handleChange}
						onInvalid={customValidation}
						autoFocus
						autoComplete
						minLength={2}
						pattern={pattern.text}
					/>

					<Input
						type='text'
						label='Efternamn'
						name='lastName'
						placeholder='Svensson'
						value={value.lastName}
						onChange={handleChange}
						onInvalid={customValidation}
						minLength={2}
						pattern={pattern.text}
					/>

					<Input
						type='email'
						label='Mail'
						name='email'
						placeholder='example@gmail.com'
						value={value.email}
						onChange={handleChange}
						onInvalid={customValidation}
						minLength={13}
					/>

					<Input
						type='password'
						label='Lösenord'
						name='password'
						placeholder='*******'
						value={value.password}
						onChange={handleChange}
						onInvalid={customValidation}
						minLength={4}
						pattern={pattern.password}
					/>

					<Input
						type='password'
						label='Upprepa lösenord'
						name='confirmPassword'
						placeholder='*******'
						value={value.confirmPassword}
						onChange={handleChange}
						onInvalid={customValidation}
						passwordsMatch={passwordsMatch}
						minLength={4}
						pattern={pattern.password}
					/>
				</Form>
				<NavLink
					to='../login'
					style={{
						color: '#485F73',
						marginTop: '4px',
						alignSelf: 'flex-end'
					}}>
					Logga in
				</NavLink>
			</div>
		</div>
	)
}