import express, { Express } from "express"
import cors from "cors";

const app: Express = express();

app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.use(cors());

/** Routes **/

/** Routes **/

export default app;
