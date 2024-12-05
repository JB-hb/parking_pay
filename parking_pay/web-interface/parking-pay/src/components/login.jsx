import React, {useState} from "react"
import {useAuth} from "../contexts/auth_context.jsx"
import {useNavigate} from "react-router-dom"

export const LoginForm = () => {

	const {login} = useAuth();
	const direct = useNavigate();
	const [data, setData] = useState({
		mail:"",
		password:""
	});
	const [error, setError] = useState(null);

	const submitLogin = async (e) => {
		e.preventDefault();
		const response = await login(data);
		setError(curr => curr = null);
		if(response.statusText){
			direct("/");
		}
		setError(curr => curr = response.error);
	}

	const changeData = ({target:{id, value}}) =>{
		setData(curr => curr = {
			...curr,
			[id]:value
		})
	}

	return (
		<section>
			{error && <p>{error}</p>}
			<form onSubmit={submitLogin}>
				<label htmlFor="mail">Correo Electronico</label>
				<input type="email" id="mail" placeholder="example@gmail.com" onChange={changeData}/>
				<label htmlFor="password">Contraseña</label>
				<input type="password" id="password" placeholder="*****" onChange={changeData}/>
				<input type="submit" value="login"/>	
			</form>
		</section>
	)

}
