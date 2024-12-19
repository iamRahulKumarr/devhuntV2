import { CookieOptions, NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

import baseModule from "../../core/base/abstract.class.base.module";

import User from "../users/user.model";

import { env } from "../../envConfig";

import { CreateUserPayload, UserDocument } from "../../types/users/user";
import catchAsync from "../handlers/error-handler/catchAsync";
import AppError from "../handlers/error-handler/class.AppError";


export default class AuthModule extends baseModule {

    public login(): (req: Request, res: Response, next: NextFunction) => any {

        return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

            const { email, password } = req.body;

            if (!email || !password) {
                return next(new AppError(this.INVALID_FORM_INPUT_MSG, this.INVALID_FORM_INPUT));
            }

            const user: UserDocument | null = await User.findOne({ email }).select('+password');

            if (!user || !(await user.comparePasswords(password, user.password))) {
                return next(new AppError('Invalid email or password. Please try again!', this.UNAUTHORIZED));
            }

            const accessToken = this.signAccessToken(user._id);

            this.createCookie(accessToken, res);

            return this.ok(res, {user});
        })
    }


    public registerClient(): (req: Request, res: Response, next: NextFunction) => any {

        return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

            const userPayload: CreateUserPayload = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                userType: 'client'
            }

            if (!userPayload.firstName || !userPayload.lastName || !userPayload.email || !userPayload.password) {
                return next(new AppError(this.INVALID_FORM_INPUT_MSG, this.INVALID_FORM_INPUT));
            }

            const user: UserDocument = await User.create(userPayload);

            const accessToken = this.signAccessToken(user._id);

            this.createCookie(accessToken, res);

            return this.ok(res, {user});
        })
    }

    public registerFreelancer(): (req: Request, res: Response, next: NextFunction) => any {

        return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

            const userPayload: CreateUserPayload = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                userType: 'freelancer'
            }

            if (!userPayload.firstName || !userPayload.lastName || !userPayload.email || !userPayload.password) {
                return next(new AppError(this.INVALID_FORM_INPUT_MSG, this.INVALID_FORM_INPUT));
            }

            const user: UserDocument = await User.create(userPayload);

            const accessToken = this.signAccessToken(user._id);

            this.createCookie(accessToken, res);

            return this.ok(res, {user});
        })
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