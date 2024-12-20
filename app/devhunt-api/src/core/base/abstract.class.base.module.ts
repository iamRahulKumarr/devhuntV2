import { Response } from 'express';
import Base from './abstract.class.base';

export default abstract class baseModule extends Base {

    constructor() {
        super();
    }

    // protected abstract module(req: Request, res: Response): Promise<void | any>;

    // public async execute(req: Request, res: Response): Promise<void | any> {
    //     try {

    //         await this.module(req, res);

    //     } catch (err) {

    //     }
    // }

    /** Success Response **/
    protected ok(res: Response, data: object): Response {

        if (!data) {
            return this.response(res, this.SUCCESS_CODE, this.SUCCESS_MSG)
        }

        return this.response(res, this.SUCCESS_CODE, this.SUCCESS_MSG, data)
    }

    /** Unauthorised Response **/
    protected unauthorized(res: Response, message:string){

        return this.response(res, this.UNAUTHORIZED, message,);
    }
    
    /**  Validation Error Response **/
    protected invalidInput(res:Response): Response{

        return this.response(res, this.INVALID_FORM_INPUT, this.INVALID_FORM_INPUT_MSG);
    }

    /** Not Found Response **/
    protected notFound(res: Response): Response {

        return this.response(res, this.NOT_FOUND_RESOURCE_CODE, this.NOT_FOUND_RESOURCE_MSG);
    }

    /**  Fatal Error Response **/
    protected ops(res: Response): Response {

        return this.response(res, this.INTERNAL_SERVER_ERROR_CODE, this.INTERNAL_SERVER_ERROR_MSG);
    }
}