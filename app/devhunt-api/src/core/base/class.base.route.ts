import { Application } from "express";
import Base from "./class.base";

export default abstract class BaseRoute extends Base{

    protected ALL: string = '*';

    //API Seperator default= '/'
    protected abstract SP: string;

    protected abstract VERSION: string;

    public abstract run(app: Application):void;
}