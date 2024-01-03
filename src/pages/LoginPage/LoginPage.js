import React, { useState } from 'react'
import Form from '../../components/Form/Form'
import Input from '../../components/Input/Input'
import styles from './loginpage.module.css'
import { UserAuth } from '../../context/AuthContext'
import { Feedback } from '../../components/Feedback/Feedback'
import { Navigate, NavLink } from 'react-router-dom';

export default function LoginPage() {
	const [value, setValue] = useState({ email: '', password: '' });
	const auth = UserAuth();


	const onReset = () => setValue({ email: '', password: '' });
	const handleChange = ({ target }) => setValue({ ...value, [target.name]: target.value });

	const onSubmit = (e) => {
		e.preventDefault();

		auth?.login(value)
	}


	if (auth?.user) return <Navigate to='/' replace />

	return (
		<div className={styles.loginpage}>
			{auth?.error && <Feedback error={auth.error} />}

			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<Form
					title='Logga in'
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
				<NavLink
					to='../register'
					style={{
						color: '#485F73',
						marginTop: '4px',
						alignSelf: 'flex-end'
					}}>
					Registrera nytt konto
				</NavLink>
			</div>
		</div>
	)
}