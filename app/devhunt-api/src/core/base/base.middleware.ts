import Base from "./base";

export default abstract class BaseMiddlewareService extends Base{

    protected async adapter(service: void | PromiseLike<void>, res:Response): Promise<void | any>{

        try{
            await service;
        }catch(err){
            
        }
    }

}