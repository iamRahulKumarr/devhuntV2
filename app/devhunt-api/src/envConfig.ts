import { number, object, ObjectSchema, string, ValidationError } from "yup";

import Logging from "./library/logging";

interface EnvConfig {
    NODE_ENV: "development" | "production";
    PORT: number;
    DATABASE_DEVELOPMENT_URI: string;
    DATABASE_PRODUCTION_URI: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
}

const envSchema: ObjectSchema<EnvConfig> = object({
    NODE_ENV: string().oneOf(["development", "production"]).required('NODE_ENV is required for env'),
    PORT: number().required('PORT is required for env'),
    DATABASE_DEVELOPMENT_URI: string().required('DATABASE_DEVELOPMENT_URI is required for env'),
    DATABASE_PRODUCTION_URI: string().required('DATABASE_PRODUCTION_URI is required for env'),
    JWT_SECRET: string().required('JWT_SECRET is required for env'),
    JWT_EXPIRES_IN: string().required('JWT_EXPIRES_IN is required for env'),
});

const envConfig: EnvConfig = {
    NODE_ENV: process.env.NODE_ENV as 'development' | 'production',
    PORT: Number(process.env.PORT),
    DATABASE_DEVELOPMENT_URI: process.env.DATABASE_DEVELOPMENT_URI!,
    DATABASE_PRODUCTION_URI: process.env.DATABASE_PRODUCTION_URI!,
    JWT_SECRET: process.env.JWT_SECRET!,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN!
}

export const validateEnv = (env: NodeJS.ProcessEnv) => {

    try {

        envSchema.validateSync(env, { abortEarly: false })

    } catch (error) {

        if (error instanceof ValidationError) {

            Logging.error(error.message);
        }
    }
}


export const env = envConfig;
