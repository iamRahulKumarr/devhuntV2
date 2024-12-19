import { Request, Response } from "express";

import BaseRouter from "../../core/base/abstract.class.base.router";
import AuthModule from "./class.auth.module";

export default class AuthRouter extends BaseRouter {

    private authModule: AuthModule;

    constructor() {
        super();

        this.authModule = new AuthModule();

        this.composeRouteService();
    }

    protected composeRouteService(): void {

        // this.RouterInstance.post('/login', (req: Request, res: Response) => this.authModule.login(req, res));

        this.RouterInstance.post('/login', this.authModule.login());

        this.RouterInstance.post('/register/client', this.authModule.registerClient());

        this.RouterInstance.post('/register/freelancer', this.authModule.registerFreelancer());

    }

}