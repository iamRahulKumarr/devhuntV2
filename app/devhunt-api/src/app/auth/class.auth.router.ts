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

        this.RouterInstance
            .post('/login', this.authModule.login())
            .post('/register/client', this.authModule.registerClient())
            .post('/register/freelancer', this.authModule.registerFreelancer());
    }

}