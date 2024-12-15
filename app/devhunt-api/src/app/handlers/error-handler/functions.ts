import { ErrorRequestHandler, NextFunction, Response, Request } from "express";
import AppError from "./class.AppError";
import { env } from "../../../envConfig";


const sendDevError = (error: AppError, res: Response) => {
    return res.status(error.httpCode).json({
        message: error.message,
        status: error.status,
        error,
        stack: error.stack,
    })
}

const globalErrorHandler: ErrorRequestHandler = (
    error: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    if (env.NODE_ENV === 'development') {
        sendDevError(error, res);
        return;
    }
};

export default globalErrorHandler;