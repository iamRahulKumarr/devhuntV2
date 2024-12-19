import { ErrorRequestHandler, NextFunction, Response, Request } from "express";
import AppError from "./class.AppError";
import { env } from "../../../envConfig";
import Logging from "../../../library/logging";

export default class globalErrorHandler {

    public static handleError(): ErrorRequestHandler {

        return (error: AppError,
            req: Request,
            res: Response,
            next: NextFunction) => {

            error.httpCode = error.httpCode || 500;

            error.status = error.status || 'error';

            if (env.NODE_ENV === 'development') {
                this.sendDevError(error, res);
            }
        }
    }

    private static sendDevError(error: AppError, res: Response) {

        Logging.error(error.message);

        return res.status(error.httpCode).json({
            message: error.message,
            status: error.status,
            error,
            stack: error.stack,
        })
    }
}