import {createClient} from "@supabase/supabase-js"

const supabaseUrl = 'https://pnrwnkawoavhugcwrmsa.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBucndua2F3b2F2aHVnY3dybXNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyMTkzODUsImV4cCI6MjA0Nzc5NTM4NX0.tv3BNEcVfrKFlIzmrNFaXrIbCSHP4U7fU6GuQLBNCIE'
const supabase = createClient(supabaseUrl, supabaseKey)

export class ticket_module{

	static async generate_ticket(id_client, id_sucursal){

		try{

			const { statusText: insert_status, error: insert_error} = await supabase
				.from("Tickets")
				.insert({Client_Id: id_client, Sucursal_Id: id_sucursal})

			if(insert_error){
				return {error: "error connecting to database"};
			}

			if(insert_status != "Created"){
				return {error: "error connecting to database"};
			}

			return{statusText: "Completed"};

		}catch(error){
			return {error: "error connecting to database"};
		}

	}

	static async change_ticket_status(id_ticket, new_status){

		try{

			const { data: ticket, error: ticket_error } = await supabase
				.from("Tickets")
				.Select("Status")
				.eq("id", id_ticket)

			if(ticket_error){
				return {error: "error connectig to database"};
			}

			if(ticket && ticket.length == 0){
				return {error: "cant find tiket"};
			}

			if(ticket[0].Status == new_status){
				return {error: "no change needed"};
			}

			const { statusText: update_status, error: update_error} = await supabase
				.from("Tickets")
				.update({Status: new_status})
				.eq("id", id_ticket)

			if(update_error){
				return {error: "error connecting to database"};
			}

			if(update_status != "OK"){
				return {error: "error updating value"};
			}

			return {statusText: "Completed"};

		}catch(error){
			return {error: "error connecting to database"};
		}

	}

	static async use_ticket(ticket_id){

		try{

			const { data: ticket, error: ticket_error}  = await supabase
				.from("Tickets")
				.select("Status")
				.eq("id", ticket_id)

			if(ticket_error){
				return {error: "error connecting to database"};
			}

			if(ticket && ticket.length == 0){
				return {error: "cant find ticket"};
			}

			if(ticket[0].Status != "paid"){
				return {error: "invalid ticket status", statusText: ticket[0].Status};
			}

			const { statusText: ticket_status, error: status_error} = await supabase
				.from("Tickets")
				.update({Status: "used"})
				.eq("id", ticket_id)

			return {statusText: "Compleated"}

		}catch(error){
			return {error: "error connecting to database"};
		}

	}

}
