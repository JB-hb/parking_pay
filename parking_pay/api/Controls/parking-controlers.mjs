import {auth_module} from "../Modules/parking-auth-module.mjs" 

export class parking_controlers{

	static async parking_auth_login(req, res){
	
		const {mail, password} = req.query;
		const response = await auth_module.login(mail, password); //modulo de inicio de sesion
		res.json(response);

	}

	static async parking_auth_register(req, res){

		const {mail, password, name} = req.body;
		const response = "" //modulo de registro de usuario cliente
	}

	static async parking_auth_registerAdmin(req, res){

		const {type, mail, password, name} = req.body
		const type_options = ["cli", "emp", "adm"];

		if(type_options.includes(type)){
			const response = "" //modulo de registro 
		}else{
			const response = {error: "tipo de usuario invalido"};
		}

		res.json(reponse);
	}

}
