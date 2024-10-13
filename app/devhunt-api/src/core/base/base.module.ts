import { Request, Response } from 'express';
import Base from './base';

export default abstract class baseModule extends Base {

    constructor() {
        super();
    }

    protected abstract module(req: Request, res: Response): Promise<void | any>;

    public async execute(req: Request, res: Response): Promise<void | any> {
        try {

            await this.module(req, res);

        } catch (err) {

        }
    }

    /** Success Response Generic **/
    protected ok<T>(res: Response, data: object): Response {

        if (!data) {
            return this.response(res, this.SUCCESS_CODE, this.SUCCESS_MSG)
        }

        return this.response(res, this.SUCCESS_CODE, this.SUCCESS_MSG, data)
    }

    /**  Fatal Error Response Generic **/
    protected ops<T>(res: Response): Response {

        return this.response(res, this.INTERNAL_SERVER_ERROR_CODE, this.INTERNAL_SERVER_ERROR_MSG);
    }

    /** Not Found Response Generic **/
    protected notFound<T>(res: Response): Response {

        return this.response(res, this.NOT_FOUND_RESOURCE_CODE, this.NOT_FOUND_RESOURCE_MSG);
    }
}