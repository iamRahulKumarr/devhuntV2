import baseModule from "@src/core/base/abstract.class.base.module";
import { NextFunction, Request, Response } from "express";
import User from "../users/users.model";

export class AuthModule extends baseModule {

    public async login(req: Request, res: Response): Promise<void> {

        try {
            const { email, password } = req.body;

            if (!email || !password) {
                this.invalidInput(res);
                return;
            }

            const user = await this.findUserByEmail(email);

            if(!user){
                this.notFound(res);
                return;
            }

            

        } catch (error) {

        }
    }

    private findUserByEmail(email: string) {

        return User.findOne({ email }).select('+password');

    }
}