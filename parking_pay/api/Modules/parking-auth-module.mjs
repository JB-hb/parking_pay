import {createClient} from "@supabase/supabase-js"

const supabaseUrl = 'https://pnrwnkawoavhugcwrmsa.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBucndua2F3b2F2aHVnY3dybXNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyMTkzODUsImV4cCI6MjA0Nzc5NTM4NX0.tv3BNEcVfrKFlIzmrNFaXrIbCSHP4U7fU6GuQLBNCIE'
const supabase = createClient(supabaseUrl, supabaseKey)

export class auth_module{

	static async login (mail, password){

		try{
			const {data : user, error} = await supabase
				.from("Users")
				.select("*")
				.eq("Mail", mail)

			if(user && (user.length > 0)){
				if(user[0].Password == password){

					let auth;

					if(user[0].Type == "cli"){

						const {data : auth_data, error: errorCli} = await supabase
							.from("Clients")
							.select("id, Saldo, Name, Discount") 
							.eq("Id_User", user[0].id);
						auth = {...auth_data[0], type: user[0].Type};
						console.log(auth);

					}else if(user[0].Type == "emp"){

						const {data : auth_data, error: errorEmp} = await supabase
							.from("Empresas")
							.select("Id, Name") 
							.eq("Id_User", user[0].id);
						auth = {...auth_data[0], type: user[0].Type};

					}else if(user[0].Type == "adm"){

						const {data : auth_data, errorAdm} = await supabase
							.from("Admins")
							.select("id, Name, CI") 
							.eq("Id_User", user[0].id);
						auth = {...auth_data[0], type: user[0].Type};

					}

					const resp = {auth: auth}
					return resp;	
				}
				return {error: "invalid password"};
			}

			return {error: "user not found"};

		}catch(error){

			return {error: "error trying to connect to database"};

		}

	}

	static async register(mail, password, name, ci = 0, type = "cli"){

		try{

			const {data : user, error} = supabase
				.from("Users")
				.select("*")
				.eq("Mail", mail)

			if(user && (user.length > 0)){
				return {error: "user already exist"};
			}

			const new_user = {Mail: mail, Password: password, Type: type};

			const {data, statusText:status_user , error1} = supabase
				.form("Users")
				.insert(new_user)
				.select("id")

			if(status_user != "Created"){
				return {error: "Error creating User"};
			}
			if(data == undefined || data.length == 0){
				return {error: "Error fetching User"};
			}

			switch(type){
				case "cli":
					const {statusText: statusCli, error: errorCli} = supabase
						.from("Clients")
						.insert({Name: name, Id_User: data[0].id})
						
					return statusCli != "Created" && {error: "Error creating Client"}; 
					break;
				case "emp":
					const {statusText: statusEmp, error: errorEmp} = supabase
						.from("Empresas")
						.insert({Name: name, Id_User: data[0].id})

					return statusEmp != "Created" && {error: "Error creating Empresa"}; 
					break;
				case "adm":
					const {statusText: statusAdm, error: errorAdm} = supabase
						.from("Admins")
						.insert({Name: name,CI: ci, Id_User: data[0].id})
					
					return statusAdm != "Created" && {error: "Error creating Admin"}; 
					break;
			}

			return {statusText: "Created"};


		}catch(error){
			return {error: "error trying to connect to database"}
		}
	}
}
