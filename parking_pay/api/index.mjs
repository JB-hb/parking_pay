import express, {json} from "express"
import {parking_router} from "./Routes/parking-control.mjs"
import cors from "cors"

const app = express();
const port = process.env.PORT ?? 1234;
app.disable("x-powered-by");

app.use(cors());
app.use(json());
app.use("/parking", parking_router);

app.listen(port, () => {
	console.log(`listening in port: ${port}`);
})
