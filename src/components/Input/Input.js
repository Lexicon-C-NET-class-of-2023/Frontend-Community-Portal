import React, { useState, useEffect, useRef } from 'react'
import styles from './input.module.css'

export default function Input({
	required,
	label,
	type,
	name,
	value,
	placeholder,
	onChange,
	onInvalid,
	minLength,
	maxLength,
	autoFocus,
	disabled,
	pattern,
	autoComplete,
	passwordsMatch,
	inputfieldWidth
}) {
	const [showPassword, setShowPassword] = useState(false);
	const confirmPasswordRef = useRef();

	useEffect(() => {
		// sets customError on confirmPassword non match
		if (passwordsMatch && !passwordsMatch()) {
			confirmPasswordRef.current?.setCustomValidity('Passwords must match');
		} else return
	}, [value])

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	}


	return (
		<div className={styles.input}>
			<label>{label}</label>
			<input
				required={required}
				type={(name === 'password' || name === 'confirmPassword') && showPassword ? 'text' : type}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				onInvalid={onInvalid}
				minLength={minLength}
				maxLength={maxLength}
				autoFocus={autoFocus}
				disabled={disabled}
				pattern={pattern}
				autoComplete={autoComplete ? 'on' : 'off'}
				ref={name === 'confirmPassword' ? confirmPasswordRef : null} // Only givs confirmPassword a reference
				style={{ minWidth: inputfieldWidth }}
			/>
			{/* Only append icon on password & password confirm */}
			{(name === 'password' || name === 'confirmPassword') &&
				<div
					onClick={toggleShowPassword}
					className={styles.imagecontainer}
				>
					{/* {showPassword ?
						<img src={hidden} width='25px' alt='password hidden' />
						:
						<img src={show} width='25px' alt='password show' />
					} */}
				</div>
			}
		</div>
	)
}

Input.defaultProps = {
	required: true,
	placeholder: 'Placeholder text',
	minLength: 3,
	autoComplete: null,
	inputfieldWidth: 250
}