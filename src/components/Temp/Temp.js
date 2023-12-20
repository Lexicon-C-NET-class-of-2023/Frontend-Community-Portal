import React, { useState } from 'react';
import Form from '../Form/Form'
import Input from '../Input/Input';


export default function Temp() {
	const [value, setValue] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: ''
	});


	const passwordsMatch = () => value.password === value.confirmPassword;
	const onReset = () => setValue({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });

	const handleChange = ({ target }) => {
		target.setCustomValidity('');
		setValue({ ...value, [target.name]: target.value });
	}

	const customValidation = ({ target }) => {
		// If custom errors are preffered (not used)
		switch (target.name) {
			case 'firstName':
				// target.setCustomValidity('You need to provide a first name')
				break;
			default:
				break;
		}
	}

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(value);
	}


	return (
		<div>
			<Form
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
					pattern="\w{3,16}"
				/>

				<Input
					type='text'
					label='Efternamn'
					name='lastName'
					placeholder='Svensson'
					value={value.lastName}
					onChange={handleChange}
					onInvalid={customValidation}
					pattern="\w{3,16}"
				/>

				<Input
					// required={false}
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
					required={false}
					type='password'
					label='Lösenord'
					name='password'
					placeholder='*******'
					value={value.password}
					onChange={handleChange}
					onInvalid={customValidation}
				// pattern="\w{3,16}"
				/>

				<Input
					required={false}
					type='password'
					label='Upprepa lösenord'
					name='confirmPassword'
					placeholder='*******'
					value={value.confirmPassword}
					onChange={handleChange}
					onInvalid={customValidation}
					passwordsMatch={passwordsMatch}
				// pattern="\w{3,16}"
				/>
			</Form>
		</div>
	)
}