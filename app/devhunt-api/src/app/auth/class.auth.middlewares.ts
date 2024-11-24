import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

import BaseMiddlewareService from "src/core/base/abstact.class.base.middleware";
import { env } from "src/envConfig";
import User from "../users/user.model";

export default class authMiddlewareService extends BaseMiddlewareService {

    constructor(){
        super();

        /** Explicitly bind middleware methods **/
        this.protect = this.protect.bind(this);
    }

    public async protect(req: Request, res: Response, next: NextFunction): Promise<Response | void> {

        const service = async (): Promise<Response | void> => {

            let accessToken: string | null = req.cookies.accessToken;

            if (!accessToken) {
                return this.response(res, this.UNAUTHORIZED, 'Not Authorized');
            }

            const decoded = jwt.verify(accessToken, env.JWT_SECRET, (error, decodedData) => {
                if (error) {
                    return this.response(res, this.UNAUTHORIZED, 'Not Authorized');
                } else {
                    return decodedData;
                }

            });

            const user = await User.findById(decoded);

            if (!user) {
                return this.response(res, this.UNAUTHORIZED, 'User belonging to this token does not exist.');
            }

            (req as any).user = user;
        }

        await this.adapter(service(), res);
        next();

    }
}