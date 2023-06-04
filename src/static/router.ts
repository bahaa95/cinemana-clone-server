import { IRouter, Router as router } from 'express';

export abstract class Router<Controller> {
  protected readonly path: string;
  protected readonly router: IRouter;
  protected readonly controller: Controller;

  constructor(path: string, controller: Controller) {
    this.path = path;
    this.router = router();
    this.controller = controller;
  }

  public getRoutes = () => this.router;
  protected abstract initializeRoutes(): void;
}
