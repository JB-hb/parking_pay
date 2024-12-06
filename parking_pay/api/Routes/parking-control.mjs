import {Router} from "express"
import {parking_controlers} from "../Controls/parking-controlers.mjs"

export const parking_router = Router();

//All Routes

parking_router.get("/login", parking_controlers.parking_auth_login)
parking_router.post("/register", /* controler */);
//parking_router.get("/ticket/:id", /*controler*/);

//Clients Routes

parking_router.patch("/cli/:id_cli/add-balance", parking_controlers.parking_pay_balance);
parking_router.patch("/cli/:id_cli/pay/:id_ticket", parking_controlers.parking_pay_ticket);
parking_router.get("/cli/sucursales/:first/:interval", parking_controlers.get_sucursales_list);

//Empresas Routes

parking_router.post("/emp/:id_emp/register-suc", parking_controlers.parking_sucursal_create);
parking_router.get("/emp/:id_emp/sucursales", parking_controlers.parking_sucursales_emp);
parking_router.patch("/emp/:id_emp/sucursales/patch/:id_sucur", parking_controlers.parking_sucursal_update);
parking_router.post("/emp/:id_emp/sucursales/delete/:id_sucur", parking_controlers.parking_sucursal_delete);

//Ticket 

parking_router.post("/ticket/:id_client/:id_sucursal", parking_controlers.parking_ticket_generate);
parking_router.patch("/ticket/:id_ticket/:new_status", parking_controlers.parking_ticket_changes_status);
parking_router.patch("/ticket/:ticket_id", parking_controlers.parking_ticket_use);

//Admin Routes

//parking_routes.post("/adm/creae-user", /*controler*/);
//parking_routes.patch("/adm/ticket/:id", /*controler*/);
