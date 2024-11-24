import { Response } from "express";

import Base from "./abstract.class.base";
import Logging from "src/library/logging";

export default abstract class BaseMiddlewareService extends Base {

    protected async adapter(service: void | PromiseLike<void> | Promise<void | Response>, res: Response): Promise<void | any> {

        try {
            await service;
            
        } catch (err: any) {
            
            Logging.error(err.message);
        }
    }

    /** Helper methods **/

}