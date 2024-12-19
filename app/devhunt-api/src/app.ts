import express, { Express } from "express"
import cookieParser from "cookie-parser";
// import compression from "compression";
import morgan from "morgan";
import cors from "cors";

import AuthRoute from "./app/auth/class.auth.route";

import GlobalErrorHandler from "./app/handlers/error-handler/class.GlobalErrorHandler";

const app: Express = express();

// app.use(compression());

app.use(morgan('dev'));

app.use(cookieParser());

app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.use(cors());

const authRoute = new AuthRoute();

/** Routes **/
authRoute.run(app);
/** Routes **/

app.use(GlobalErrorHandler.handleError());

export default app;
