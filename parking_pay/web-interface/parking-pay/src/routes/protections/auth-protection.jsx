import React from "react"
import {useAuth} from "../../contexts/auth_context.jsx"
import {useNavigate} from "react-router-dom"

export const ProtectAuth = ({children}) => {

	const {user} = useAuth();
	const direct = useNavigate();

	if(user != null){
		return (<>{children}</>);
	}else{
		direct("/login"); 
	}
}
