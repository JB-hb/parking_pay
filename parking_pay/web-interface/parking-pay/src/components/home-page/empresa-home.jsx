import React from "react"
import {useAuth} from "../../contexts/auth_context.jsx"

export const EmpresaHome = () => {

	const {user} = useAuth();
	
	return(
		<section>
			<p>empresa home</p>
		</section>
	);

}
