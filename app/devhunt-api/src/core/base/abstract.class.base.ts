import { Response, NextFunction } from "express";

interface dto {
    status: number;
    message: string;
    data?: object
}

export default abstract class Base {

    //Response Codes
    protected SUCCESS_CODE: number = 200;

    protected INVALID_FORM_INPUT: number = 400;

    protected NOT_FOUND_RESOURCE_CODE: number = 404;

    protected INTERNAL_SERVER_ERROR_CODE: number = 500;

    //Response Messages
    protected SUCCESS_MSG: string = 'success';

    protected NOT_FOUND_RESOURCE_MSG: string = 'resource not found';

    protected INVALID_FORM_INPUT_MSG: string = 'Invalid input provided. Please ensure all required fields are correctly filled and try again.'
    
    protected INTERNAL_SERVER_ERROR_MSG: string = 'internal server error';


    protected response(res: Response, code: number, message: string, data?: object): Response {

        const dto: dto = { status: code, message };

        if (data) {
            dto.data = data;
        }

        return res.status(code).json(dto);
    }
}