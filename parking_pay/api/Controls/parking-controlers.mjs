import {auth_module} from "../Modules/parking-auth-module.mjs" 
import {ticket_module} from "../Modules/parking-ticket-module.mjs" 
import {sucursales_module} from "../Modules/parking-sucursal-module.mjs" 
import {pay_module} from "../Modules/parking-pay-module.mjs" 

export class parking_controlers{

	// auth

	static async parking_auth_login(req, res){
	
		const {mail, password} = req.query;
		const response = await auth_module.login(mail, password); //modulo de inicio de sesion
		res.json(response);

	}

	static async parking_auth_register(req, res){

		const {mail, password, name} = req.body;
		const response = await auth_module.register(mail, password, name) //modulo de registro de usuario cliente
		res.json(response);
	}

	static async parking_auth_registerAdmin(req, res){

		const {type, mail, password, name, ci} = req.body
		const type_options = ["cli", "emp", "adm"];

		if(type_options.includes(type)){
			const response = await auth_module.register(mail, password, name, ci != undefined ? ci : 0, type) //modulo de registro 
		}else{
			const response = {error: "tipo de usuario invalido"};
		}

		res.json(reponse);
	}

	//pay
	
	static async parking_pay_ticket(req, res){
		const {id_cli, id_ticket} = req.params
		const response = await pay_module.pay_ticket(id_ticket, id_cli);
		res.json(response);
	}

	static async parking_pay_balance(req, res){
		const {id_cli} = req.params
		const {data} = req.body
		const response = await pay_mocule.add_to_balance(id_cli, data);
		res.json(response);
	}


	//sucursales
	
	static async parking_sucursales_emp(req, res){
		const {id_emp} = req.params
		const response = await sucursales_module.get_sucursales_empresa(id_empresa);
		res.json(response);
	}

	static async parking_sucursal_update(req, res){
		const {id_sucur} = req.params
		const {data} = req.body
		const response = await sucursales_module.update_sucursal(id_sucur, data);
		res.json(response);
	}

	static async parking_sucursal_delete(req, res){
		const {id_sucur} = req.params
		const response = await sucursales_module.delete_sucursal(id_sucur);
		res.json(response);
	}

	static async parking_sucursal_create(req, res){
		const {id_emp} = req.params
		const {data} = req.body
		const response = await sucursales_module.create_sucursal(id_emp, data.name, data.tarifa, data.type);
		res.json(reponse);
	}

	static async get_sucursales_list(req, res){
		const {first, interval} = req.params
		const response = await sucursales_module.get_lista_sucursales(first, interval);
		res.json(response);
	}

	//tickets

	static async parking_ticket_generate(req, res){

		const { id_sucursal, id_client } = req.params

		const response = await ticket_module.generate_ticket(id_client, id_sucursal); 

		res.json(response);

	} 

	static async parking_ticket_changes_status(req, res){
		const {id_ticket, new_status} = req.params;
		const response = await ticket_module.change_ticket_status(id_ticket, new_status);
		res.json(response);
	}

	static async parking_ticket_use(req, res){
		const {ticket_id} = req.params
		const response = await ticket_module.use_ticket(ticket_id);
	}

	//Todo: get_unpaid_tickets

}
