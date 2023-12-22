import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext';


export default function Protected({ children }) {
	const auth = UserAuth();
	const session = sessionStorage.getItem("user");
	if (!session || !auth) return <Navigate to='../login' replace={true} />
	else return <>{children}</>;
}