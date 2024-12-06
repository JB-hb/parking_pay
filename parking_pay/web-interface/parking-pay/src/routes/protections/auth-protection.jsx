import React, {useEffect} from "react"
import {useAuth} from "../../contexts/auth_context.jsx"
import {useNavigate} from "react-router-dom"

export const ProtectAuth = ({children}) => {

	const {user} = useAuth();
	const direct = useNavigate();

	useEffect(() => {
		if(user == null){
			direct("/parking/login"); 
		}
	},[])

	return(
		<>
			{children}
		</>
	)
	
}
