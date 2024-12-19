import BaseRouter from "../../core/base/abstract.class.base.router";
import PostModule from "./class.post.module";
import AuthMiddlewareService from "../auth/class.auth.middlewares";

export default class PostRouter extends BaseRouter {

    private postModule: PostModule;

    private authMiddlewareService: AuthMiddlewareService;

    constructor() {
        
        super();

        this.postModule = new PostModule();

        this.authMiddlewareService = new AuthMiddlewareService();

        this.composeRouteService();
    }

    protected composeRouteService(): void {

        this.RouterInstance.post('/create', this.authMiddlewareService.protect(), this.authMiddlewareService.restrictTo('client'), this.postModule.createPost());

        this.RouterInstance.get('/all', this.postModule.getAllPosts());
        
        this.RouterInstance.get('/:id', this.postModule.getPost());

    }
}