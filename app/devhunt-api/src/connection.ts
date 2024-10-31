import mongoose from "mongoose";
import { env } from "./envConfig";

export const mongooseConnect = () =>{

    return mongoose.connect(env.DATABASE_DEVELOPMENT_URI);
}