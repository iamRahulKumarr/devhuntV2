import { Router } from 'express';

export default abstract class BaseRouter{

    public RouterInstance: Router = Router();

    protected abstract composeRouteService():void
}