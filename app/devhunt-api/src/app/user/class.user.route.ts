import BaseRoute from "../../core/base/abstract.class.base.route";
import UserRouter from "./class.user.router";
import { Application } from "express";

export default class UserRoute extends BaseRoute{

    protected SP: string = '/users';

    protected VERSION: string ='/v1';

    private userRouter: UserRouter;

    constructor(){
        super();

        this.userRouter = new UserRouter();

    }

    public run(app: Application){
        app.use(`${this.VERSION}${this.SP}`, this.userRouter.RouterInstance);
    }


}