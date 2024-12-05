import React form "react"
import {useAuth} from "../../contexts/auth_context.jsx"

export const ClientHome = () => {

	const {user} = useAuth();

	return (
		<section>
			<p>Saldo: {user.Saldo}</p>
			<p>Descuento: {user.Discount}</p>
		</section>
	);
}
