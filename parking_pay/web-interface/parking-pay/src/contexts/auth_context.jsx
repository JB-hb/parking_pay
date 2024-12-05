import axios from "axios"
import React, {useContext, useState, createContext} from "react"

export const authContext = createContext();

export const useAuth = () => {
	const context = useContext(authContext)
	return context;
}

export const AuthContextProvider = ({children}) => {

	const baseUrl = "http://localhost:1234/parking"

	const [user, setUser] = useState(null);

	const  login = async({mail, password}) => {

		const response = await axios.get(baseUrl + "/login", {params:{mail: mail, password: password}})
		if(response.data.error){
			return {error: response.data.error}
		}
		setUser(response.data.auth);
		return {statusText:"completed"}

	}

	return(
		<authContext.Provider value={
			{
				user,
				login
			}
		}>
			{children}
		</authContext.Provider>
	)

}
