import React from "react"
import {Routes, Route} from "react-router-dom"
import {AuthContextProvider} from "../contexts/auth_context.jsx"
import {LoginForm} from "../components/login.jsx"
import {ProtectAuth} from "./protections/auth-protection.jsx"
import { UserTypeAdmProtection, UserTypeProtectionHome } from "./protections/user-type-protection.jsx"


export const PageRoutes = () => {
	return(
		<>
			<AuthContextProvider>
				<Routes>
					<Route
						path = '/parking/login'
						element = {<LoginForm/>}
					/>
					<Route 
						path = '/parking'
						element = {
							<ProtectAuth>
								{<UserTypeProtectionHome/>}
							</ProtectAuth>
						}
					/>
				</Routes>
			</AuthContextProvider>
		</>
	)
}
