import BaseRouter from "../../core/base/abstract.class.base.router";
import UserModule from "./class.user.module";

export default class UserRouter extends BaseRouter {

    private userModule: UserModule;

    constructor() {

        super();

        this.userModule = new UserModule();

        this.composeRouteService();
    }

    protected composeRouteService(): void {
        this.RouterInstance
            .get('/all', this.userModule.getAllUsers())
            .get('/:id', this.userModule.getUser());
    }
}