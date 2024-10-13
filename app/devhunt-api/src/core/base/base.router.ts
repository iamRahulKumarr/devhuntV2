import { Router } from 'express';

export default abstract class BaseRouter{

    protected RouterInstance: Router = Router();

    protected abstract composeRouteService():void
}