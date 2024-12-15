import { CookieOptions, NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

import baseModule from "../../core/base/abstract.class.base.module";

import User from "../users/user.model";

import { env } from "../../envConfig";

import { UserDocument } from "src/types/users/user";
import catchAsync from "../handlers/error-handler/catchAsync";


export default class AuthModule extends baseModule {

    public login (){
        
        return catchAsync(async (req: Request, res: Response, next: NextFunction)=>{
            const { email, password } = req.body;

            if (!email || !password) {
                this.invalidInput(res);
                return;
            }

            const user: UserDocument | null = await User.findOne({ email }).select('+password');

            if (!user || !(await user.comparePasswords(password, user.password))) {
                this.unauthorized(res, "Invalid email or password.");
                return;
            }

            const accessToken = this.signAccessToken(user._id);

            this.createCookie(accessToken, res);

            this.ok(res, user);
        })
    }

    // /** User Login **/
    // public async login(req: Request, res: Response): Promise<void> {

    //     try {
    //         const { email, password } = req.body;

    //         if (!email || !password) {
    //             this.invalidInput(res);
    //             return;
    //         }

    //         const user: UserDocument | null = await User.findOne({ email }).select('+password');

    //         if (!user || !(await user.comparePasswords(password, user.password))) {
    //             this.unauthorized(res, "Invalid email or password.");
    //             return;
    //         }

    //         const accessToken = this.signAccessToken(user._id);

    //         this.createCookie(accessToken, res);

    //         this.ok(res, user);
    //         return;

    //     } catch (error) {

    //         this.ops(res);
    //         return;
    //     }
    // }

    public async registerClient(req: Request, res: Response): Promise<void> {

        try {
            const { firstName, lastName, email, password } = req.body;

            // if (!firstName || !lastName || !email || !password) {
            //     this.invalidInput(res);
            //     return;
            // }

            const user: UserDocument = await User.create({
                firstName,
                lastName,
                email,
                password,
                userType: 'client',
            });

            const accessToken = this.signAccessToken(user._id);

            this.createCookie(accessToken, res);

            this.ok(res, user);
            return;
        } catch (error) {
            console.log(error);
            this.ops(res);
            return;

        }
    }

    public async registerFreelancer(req: Request, res: Response): Promise<void> {

        try {
            const { firstName, lastName, email, password } = req.body;

            if (!firstName || !lastName || !email || !password) {
                this.invalidInput(res);
                return;
            }

            const user: UserDocument = await User.create({
                firstName,
                lastName,
                email,
                password,
                userType: 'freelancer',
            });

            const accessToken = this.signAccessToken(user._id);

            this.createCookie(accessToken, res);

            this.ok(res, user);
            return;

        } catch (error) {
            this.ops(res);
            return;
        }
    }

    /** Helper methods **/
    private signAccessToken(_id: string) {

        return jwt.sign({ _id }, env.JWT_SECRET, {
            expiresIn: env.JWT_EXPIRES_IN
        });

    }

    private createCookie(accessToken: string, res: Response) {

        const cookieOptions: CookieOptions = {
            expires: new Date(Date.now() + 60 * 60 * 1000),
            httpOnly: true
        }

        if (env.NODE_ENV === 'production') cookieOptions.secure = true;

        res.cookie('Access-Token', accessToken, cookieOptions);

    }

}