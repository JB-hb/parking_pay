import React from "react"
import {useAuth} from "../../contexts/auth_context.jsx"
import {useNavigate} from "react-router-dom"
import {AdminHome} from "../../components/home-page"
import {ClientHome} from "../../components/home-page"
import {EmpresaHome} from "../../components/home-page"

export const UserTypeProtectionHome = () =>{

	const {user} = useAuth();

	switch(user.type){
		case "cli":
			return(<><ClientHome/></>);
			break;
		case "emp":
			return(<><EmpresaHome/></>);
			break;
		case "adm":
			return(<><AdminHome/></>);
			break;
	}

}

export const UserTypeCliProtection = ({children}) =>{

	const {user} = useAuth();
	const direct = useNavigate();

	if(user.type == "cli"){
		return(<>{children}</>);
	}else{
		direct("/");
	}
	
}

export const UserTypeEmpProtection = ({children}) =>{

	const {user} = useAuth();
	const direct = useNavigate();

	if(user.type == "emp"){
		return(<>{children}</>);
	}else{
		direct("/");
	}
	
}

export const UserTypeAdmProtection = ({children}) =>{

	const {user} = useAuth();
	const direct = useNavigate();

	if(user.type == "adm"){
		return(<>{children}</>);
	}else{
		direct("/");
	}
	
}
