import { Response } from "express";

import Base from "./abstract.class.base";

export default abstract class BaseMiddlewareService extends Base {

    protected async adapter(service: void | PromiseLike<void>, res: Response): Promise<void | any> {

        try {
            await service;
            
        } catch (err) {

        }
    }

}