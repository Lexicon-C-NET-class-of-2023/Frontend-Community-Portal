import { useContext, createContext, useState, useEffect } from "react";
import { Fetch } from "../services/fetch";

const AuthContext = createContext()


export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState();
	const [error, setError] = useState('');

	useEffect(() => {
		persist()
	}, [])


	const persist = () => {
		if (sessionStorage.getItem("user")) {
			Fetch(`users/${sessionStorage.getItem("user")}`)
				.then(res => {
					if (res?.error) setError(res.error);
					else setUser(res)
				})
				.catch(err => console.log(err))
		}
	}

	const login = (userCredentials) => {
		Fetch('login', 'LoginPage', 'POST', userCredentials)
			.then(res => {
				if (res?.error) setError(res.error);
				else {
					setUser(res)
					console.log(res);
					sessionStorage.setItem("user", `${res.id}`);
				}
			})
			.catch(err => console.log(err))
	}

	const logout = () => {
		sessionStorage.clear();
		setUser();
	}


	return (
		<AuthContext.Provider value={{ login, logout, user, error }}>
			{children}
		</AuthContext.Provider>
	)
}

export const UserAuth = () => useContext(AuthContext)