import React from "react"
import {Routes, Route} from "react-router-dom"
import {AuthContextProvider} from "../contexts/auth_context.jsx"
import {LoginForm} from "../components/login.jsx"
import {ProtectAuth} from "./protections/auth-protection.jsx"


export const PageRoutes = () => {
	return(
		<>
			<AuthContextProvider>
				<Routes>
					<Route
						path = '/login'
						element = {<LoginForm/>}
					/>
					<Route 
						path = '/'
						element = {
							<ProtectAuth>
								{/*componente select homepage*/}
							</ProtectAuth>
						}
					/>
				</Routes>
			</AuthContextProvider>
		</>
	)
}
