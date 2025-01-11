import { Application } from "express";
import BaseRoute from "../../core/base/abstract.class.base.route";
import PostRouter from "./class.post.router";

export default class PostRoute extends BaseRoute {

    protected SP: string = '/post';

    protected VERSION: string = '/v1';

    private postRouter: PostRouter;

    constructor() {
        super();

        this.postRouter = new PostRouter();
    }

    public run(app: Application) {
        return app.use(`${this.VERSION}${this.SP}`, this.postRouter.RouterInstance);
    }
}