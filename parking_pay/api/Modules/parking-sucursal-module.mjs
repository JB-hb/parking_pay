import {createClient} from "@supabase/supabase-js"

const supabaseUrl = 'https://pnrwnkawoavhugcwrmsa.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBucndua2F3b2F2aHVnY3dybXNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyMTkzODUsImV4cCI6MjA0Nzc5NTM4NX0.tv3BNEcVfrKFlIzmrNFaXrIbCSHP4U7fU6GuQLBNCIE'
const supabase = createClient(supabaseUrl, supabaseKey)

export class sucursales_module(){

	static async create_sucursal(id_empresa, name, tarifa, type){

		try{

			const { statusText: sucursal_status, error: error_sucursal } = await supabase
				.from("Sucursales")
				.insert({Name: name, Tarifa: tarifa, Tarifa_Type: type, Id_Empresa: id_empresa})

			if(error_sucursal){
				return {error: "error connecting to database"};
			}

			if(sucursal_status != "Created"){
				return {error: "error creating sucursal"};
			}

			return {statusText: "Created"};

		}catch(error){
			return {error: "error connecting to database"};
		}
			
	}

	static async update_sucursal(id_sucursal, data){

		try{

			const { statusText: update_status, error: update_error } = await supabase
				.from("Sucursales")
				.update(data)
				.eq("id", id_sucursal)

			if(update_error){
				return {error: "error connecting to database"};
			}
			
			if(update_status != "OK"){
				return {error: "error updating sucursal"};
			}

			return {statusText: "Completed"};

		}catch(error){
			return {error: "error connecting to database"};
		}

	}

	static async delete_sucursal(id_sucursal){

		try{

			const { statusText: delete_status, error: delete_error } = await supabase
				.from("Sucursales")
				.delete()
				.eq("id", id_sucursal)

			if(update_error){
				return {error: "error connecting to database"};
			}

			if(update_status != "No Content"){
				return {error: "error deleting sucursal"};
			}

			return {statusText: "Completed"};

		}catch(error){
			return {error: "error connecting to database"};
		}

	}

	static async get_sucursal(id_sucursal){

		try{

		}catch(error){
			return {error: "error connecting to database"};
		}
	}

}
