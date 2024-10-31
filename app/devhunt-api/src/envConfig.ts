import { number, object, ObjectSchema, string } from "yup";
import Logging from "./library/logging";

interface EnvConfig {
    NODE_ENV: "development" | "production",
    PORT: number,
    DATABASE_DEVELOPMENT_URI: string,
    DATABASE_PRODUCTION_URI: string,

}

const envSchema: ObjectSchema<EnvConfig> = object({
    NODE_ENV: string().oneOf(["development", "production"]).required('NODE_ENV is required for env'),
    PORT: number().required('PORT is required for env'),
    DATABASE_DEVELOPMENT_URI: string().required('DATABASE_DEVELOPMENT_URI is required for env'),
    DATABASE_PRODUCTION_URI: string().required('DATABASE_PRODUCTION_URI is required for env'),
});

const envConfig : EnvConfig = {
    NODE_ENV: process.env.NODE_ENV as 'development' | 'production',
    PORT: Number(process.env.PORT),
    DATABASE_DEVELOPMENT_URI: process.env.DATABASE_DEVELOPMENT_URI!,
    DATABASE_PRODUCTION_URI: process.env.DATABASE_PRODUCTION_URI!
}

export const validateEnv = (env: NodeJS.ProcessEnv) =>{

    try{

        envSchema.validateSync(env, {abortEarly:false})
    
    }catch(error){

        Logging.error(error);
    
    }
}


export const env = envConfig;
