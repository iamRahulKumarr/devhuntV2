import { NextFunction, Request } from "express";
import jwt from 'jsonwebtoken';

import { env } from "../../envConfig";
import User from "../user/user.model";
import BaseMiddlewareService from "../../core/base/abstact.class.base.middleware";
import AppError from "../handlers/error-handler/class.AppError";
import catchAsync from "../handlers/error-handler/catchAsync";
import { UserType } from "src/types/users/user";

export default class AuthMiddlewareService extends BaseMiddlewareService {

    constructor() {
        super();

        /** Explicitly bind middleware methods **/
        this.protect = this.protect.bind(this);
    }

    public protect() {

        return catchAsync(async (req: Request, _: any, next: NextFunction) => {

            let accessToken: string | null = req.cookies['Access-Token'];

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

        })

    }

    public restrictTo(...userRole: UserType[]) {

        return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
            
            if(!userRole.includes((req as any).user.userType)){
                return next(new AppError('Not Authorized', 401))
            }

            next();
        })
    }
}