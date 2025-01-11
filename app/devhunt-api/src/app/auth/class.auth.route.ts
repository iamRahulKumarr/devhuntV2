import BaseRoute from "../../core/base/abstract.class.base.route";
import AuthRouter from "./class.auth.router";
import { Application } from "express";

export default class AuthRoute extends BaseRoute{

    protected SP: string = '/auth';

    protected VERSION: string = '/v1';

    private authRouter: AuthRouter;

    constructor(){
        super();

        this.authRouter = new AuthRouter();
    }

    public run(app: Application){

      return  app.use(`${this.VERSION}${this.SP}`, this.authRouter.RouterInstance);

    }

}