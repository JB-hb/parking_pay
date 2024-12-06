import {createClient} from "@supabase/supabase-js"

const supabaseUrl = 'https://pnrwnkawoavhugcwrmsa.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBucndua2F3b2F2aHVnY3dybXNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyMTkzODUsImV4cCI6MjA0Nzc5NTM4NX0.tv3BNEcVfrKFlIzmrNFaXrIbCSHP4U7fU6GuQLBNCIE'
const supabase = createClient(supabaseUrl, supabaseKey)

export class sucursales_module{

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

			const { data: sucursal, error: sucursal_error } = await supabase
				.from("Sucursales")
				.select("*")
				.eq("id", id_sucursal)

			if(sucursal_error){
				return{error: "error connecting to database"};
			}

			if(sucursal && sucursal.length == 0){
				return {error: "cant find sucursal"}
			}

			return {data: sucursal[0]};

		}catch(error){
			return {error: "error connecting to database"};
		}
	}

	static async get_lista_sucursales(inicio, intervalo){

		try{

			const { data: sucursales, error: sucursales_error } = await supabase
				.from("Sucursales")
				.select("*")
				.range(inicio, inicio + intervalo)

			if(sucursales_error){
				return {error: "error connecting to database"};
			}

			if(sucursales && sucursales.length == 0){
				return {error: "cant find sucursales"}
			}

			return {data: sucursales};

		}catch(error){
			return {error: "error connecting to database"};
		}

	}

	static async get_sucursales_empresa(id_empresa){

		try{

			const { data: lista_sucursales, error: error_sucursales } = await supabase
				.from("Sucursales")
				.select("*")
				.eq("Id_Empresa", id_empresa)

			if(error_sucursales){
				return {error: "error connecting to database"};
			}
			if(lista_sucursales && lista_sucursales.length == 0){
				return {error: "cant find sucursales"}
			}

			return {data: lista_sucursales};

		}catch(error){
			return {error: "error connecting to database"}
		}

	}

}
