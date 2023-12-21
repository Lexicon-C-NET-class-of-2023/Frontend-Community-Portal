import { useContext, createContext, useState } from "react";
import { Fetch } from "../services/fetch";

const AuthContext = createContext()


export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState();
	const [error, setError] = useState('');

	const login = (userCredentials) => {
		Fetch('login', 'LoginPage', 'POST', userCredentials)
			.then(res => {
				if (res?.error) setError(res.error);
				else setUser(res)
				// else console.log(res)
			})
			.finally('reload')
			.catch(err => console.log(err))
	}

	const logout = () => {
		setUser();
	}


	return (
		<AuthContext.Provider value={{ login, logout, user, error }}>
			{children}
		</AuthContext.Provider>
	)
}

export const UserAuth = () => useContext(AuthContext)