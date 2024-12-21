import { NextFunction, Request, Response } from "express";
import baseModule from "../../core/base/abstract.class.base.module";
import catchAsync from "../handlers/error-handler/catchAsync";
import { UserDocument } from "src/types/users/user";
import User from "./user.model";
import AppError from "../handlers/error-handler/class.AppError";

export default class UserModule extends baseModule {

    /** Get All-Users Method **/
    public getAllUsers(): (req: Request, res: Response, next: NextFunction)=> any{
        return catchAsync(async (req: Request, res: Response, next: NextFunction)=> {

            const users = await User.find();

            return this.ok(res, {users});
        })
    }


    /** Get User Method **/
    public getUser(): (req: Request, res: Response, next: NextFunction) => any {

        return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

            const { id } = req.params;

            const user: UserDocument | null = await User.findById(id);

            if (!user) {
                return next(new AppError(this.NOT_FOUND_RESOURCE_MSG, this.NOT_FOUND_RESOURCE_CODE));
            }

            return this.ok(res, { user })
        })
    }
}