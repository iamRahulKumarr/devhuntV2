import { NextFunction, Request } from "express";
import jwt from 'jsonwebtoken';

import { env } from "../../envConfig";
import User from "../users/user.model";
import BaseMiddlewareService from "../../core/base/abstact.class.base.middleware";
import AppError from "../handlers/error-handler/class.AppError";

export default class authMiddlewareService extends BaseMiddlewareService {

    constructor() {
        super();

        /** Explicitly bind middleware methods **/
        this.protect = this.protect.bind(this);
    }

    public protect() {

        return async (req: Request, _:any, next: NextFunction): Promise<void> => {

            let accessToken: string | null = req.cookies.accessToken;


            if (!accessToken) {
                return next(new AppError('Not Authorized', 401))
            }
            const decoded = jwt.verify(accessToken, env.JWT_SECRET, (error, decodedData) => {
                if (error) {
                    return next(new AppError('Not Authorized', 401))
                } else {
                    return decodedData;
                }
            });


            const user = await User.findById(decoded);

            if (!user) {
                return next(new AppError('User belonging to this token does not exist.', 401))

            } else {
                (req as any).user = user;
            }

            next();

        }

    }
}