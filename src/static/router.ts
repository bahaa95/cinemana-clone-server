import { IRouter } from 'express';

export abstract class Router {
  protected abstract readonly path: string;
  protected abstract readonly router: IRouter;

  public abstract getRoutes(): IRouter;
  protected abstract initializeRoutes(): void;
}
