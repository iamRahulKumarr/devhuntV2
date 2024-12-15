import BaseError from "../../../core/base/abstract.class.baseError"

export default class AppError extends BaseError {

    constructor(message: string, httpCode: number) {
        super(message, httpCode);
    }
}