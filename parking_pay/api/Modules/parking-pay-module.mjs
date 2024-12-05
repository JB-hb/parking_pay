import {createClient} from "@supabase/supabase-js"

const supabaseUrl = 'https://pnrwnkawoavhugcwrmsa.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBucndua2F3b2F2aHVnY3dybXNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyMTkzODUsImV4cCI6MjA0Nzc5NTM4NX0.tv3BNEcVfrKFlIzmrNFaXrIbCSHP4U7fU6GuQLBNCIE'
const supabase = createClient(supabaseUrl, supabaseKey)

export class pay_module(){

	static async add_to_balance(amount, id){

		try{

			const {data: balance, error: user_error} = await supabase
				.from("Clients")
				.select("Saldo")
				.eq("id", id)

			if(user_error){
				return {error: "error connecting to database"}
			}

			if(balance.length == 0){
				return {error: "cant find the user"}
			}

			const new_balance = balance[0].Saldo + amount;

			const {statusText: pay, error: error_pay} = await supabase
				.from("Clients")
				.update({Saldo: new_balance})
				.select("Saldo")
				.eq("id",id)

			if(error_pay){
				return {error: "error connecting to database"}
			}

			if(pay != "OK"){
				return {error: "error updating balance"}
			}

			return {statusText: "Completed", newBalance: new_balance};

		}catch(error){
			return {error: "error connecting to database"}
		}

	} 

	static async pay_ticket(ticket_id, client_id){

		try{

			const {data: ticket, error: error_ticket} = await supabase
				.from("Tickets")
				.select("*")
				.eq("id", ticket_id)

			if(error_ticket){
				return {error: "error connecting to database'};
			}

			if(ticket && ticket.length == 0){
				return {error: "cant find ticket"};
			}

			const {data: user, error: error_user} = await supabase
				.from("Clients")
				.select("Saldo")
				.eq("id", client_id)

			if(error_user){
				return {error: "error connecting to database"};
			}

			if(user && user.length == 0){
				return {error: "cant find user"};
			}

			const info_pay = await this.get_info_pay(ticket_id);

			if(info_pay.error){
				return {error: info_pay.error};
			}

			const new_balance = user[0].Saldo - info_pay.amount_pay; 

			if(new_balance < 0){
				return {error: "need more money"};
			}

			//TODO: Validar actualizacion del pago

			const {statusText: client_status, error: clientu_error} =  await supabase
				.form("Clients")
				.update({Saldo: new_balance})
				.eq("id", client_id)

			const {statusText: ticket_status, error: statusu_Error} = await supabase
				.from ("Tickets")
				.update({Status: "paid", Final_amount: info_pay.amount_pay})
				.eq("id", ticket_id)

			return {statusText: "transaction completed", ticketId: ticket_id};

		}catch(error){
			return {error: "error connecting to database"}
		}

	}

	static async get_info_pay(ticket_id){

		try{

			const {data: info, error: error_info} = await supabase
				.from("Tickets")
				.select("created_at, Sucursales(Tarifa, Tarifa_Type)")
				.eq("id", ticket_id);

			if(error_info){
				return {error: "error connecting to database"}
			}

			if(info && info.length == 0){
				return {error: "cant find ticket"}
			}

			if(info && info[0].Sucursales.length == 0){
				return {error: "cant find sucursal"}
			}

			if(info[0].Sucursales[0].Tarifa_Type = "hourly"){

				const final_date = Date.now();
				const enter_date = Date(info[0].created_at)

				const time_ocuped = Math.ceil((final_date - enter_date) / (3600*1000));

				return {amount_pay: time_ocuped * info[0].Sucursales[0].Tarifa, hours: time_ocuped, tarifa: info[0].Sucursales[0].Tarifa};

			}else{

				return {amount_pay: info[0].Sucursales[0].Tarifa};

			}

		}catch(error){
			return {error: "error connecting to database"};
		}

	} 

	static async confirm_deposit(deposit_id, admin_id){

		try{

			const { data: deposit, error: deposit_error} = await supabase
				.from("Pagos")
				.select("Client_Id, Amount")
				.eq("id", deposit_id)

			if(deposit_error){
				return {error: "error connecting to database"};
			}

			if(deposit && deposit.length == 0){
				return {error: "cant find deposit"};
			}

			const { data: admin, error: admin_error} = await supabase
				.from("Admins")
				.select("*")
				.eq("id", admin_id)

			if(admin_error){
				return {error: "error connecting to database"};
			}

			if(admin && admin.length == 0){
				return {error: "invalid admin user"};
			}

			const { data: client_saldo, error: error_saldo } = await supabase
				.from("Clients")
				.select("Saldo")
				.eq("id", deposit[0].Client_Id)
			
			if(error_saldo){
				return {error: "error connecting to database};
			}

			if(client_saldo && client_saldo.length == 0){
				return {error: "cant find client"};
			}

			const { statusText: saldo_status, error: update_saldo_error} = await supabase
				.from("Clients")
				.update({Saldo: deposit[0].Amount + client_saldo[0].Saldo})
				.eq("id", deposit[0].Client_Id)

			if(update_saldo_error){
				return {error: "error connecting to database"};
			}

			if(saldo_status != "OK"){
				return {error: "error updating balance"};
			}

			const { statusText: deposit_status, error update_depsoit_error} = await supabase
				.from ("Pagos")
				.update({Status: "confirmed"})
				.eq("id", deposit_id)

			if(update_deposit_error){
				return {error: "error connecting to database"};
			}

			if(deposit_status != "OK"){
				return {error: "error updating balance"};
			}

			return{statusText: "Completed"};

		}catch(error){
			return {error: "error connecting to database"};
		}

	}

}
