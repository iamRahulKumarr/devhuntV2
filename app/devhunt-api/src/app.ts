import express, { Express } from "express"
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

import AuthRoute from "./app/auth/class.auth.route";

const app: Express = express();

app.use(morgan('dev'));

app.use(cookieParser());

app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.use(cors());

const authRoute = new AuthRoute();

/** Routes **/
authRoute.run(app);
/** Routes **/

export default app;
