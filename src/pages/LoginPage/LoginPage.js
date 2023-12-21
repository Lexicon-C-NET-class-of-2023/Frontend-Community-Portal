import React, { useState } from 'react'
import Form from '../../components/Form/Form'
import Input from '../../components/Input/Input'
import styles from './loginpage.module.css'
import { UserAuth } from '../../context/AuthContext'
import { Error } from '../../components/Error/Error'
import { Navigate } from 'react-router-dom';

export default function LoginPage() {
	const [value, setValue] = useState({ email: '', password: '' });
	const { login,user, error } = UserAuth && UserAuth();


	const onReset = () => setValue({ email: '', password: '' });
	const handleChange = ({ target }) => setValue({ ...value, [target.name]: target.value });

	const onSubmit = (e) => {
		e.preventDefault();

		login(value)
	}


	if (user) return <Navigate to='/' replace />

	return (
		<div className={styles.loginpage}>
			{error && <Error error={error} />}

			<Form
				title='Login'
				handleSubmit={onSubmit}
				handleReset={onReset}
			>
				<Input
					type='email'
					label='Mail'
					name='email'
					placeholder='example@gmail.com'
					value={value.email}
					onChange={handleChange}
					autoComplete={true}
					minLength={13}
				/>

				<Input
					type='password'
					label='Lösenord'
					name='password'
					placeholder='*******'
					value={value.password}
					onChange={handleChange}
				/>
			</Form>
		</div>
	)
}