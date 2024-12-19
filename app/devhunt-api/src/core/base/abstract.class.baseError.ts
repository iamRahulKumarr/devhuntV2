export default abstract class BaseError extends Error{

   public readonly message: string;

   public httpCode: number;

   public status: string;

   public readonly isOperational: boolean;

    constructor(message: string, httpCode: number){
        
        super(message);

        this.message = message;

        this.httpCode = httpCode;

        this.status = `${httpCode}`.startsWith('4') ? 'fail' : 'error';

        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}