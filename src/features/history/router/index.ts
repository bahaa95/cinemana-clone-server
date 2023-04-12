import { IRouter, Router as router } from 'express';
import { Router } from '@/static/router';
import { limiter } from '@/middleware/limiter';
import { verifyJwt } from '@/middleware/verifyJwt';
import { validateResource } from '@/middleware/validateResource';
import { IHistoryController } from '../controller';
import { editHistorySchema, getHistorySchema } from '../validation';

export class HistoryRouter extends Router {
  protected path = '/history';
  protected router: IRouter;
  private readonly historyController: IHistoryController;

  constructor(_historyController: IHistoryController) {
    super();
    this.router = router();
    this.historyController = _historyController;
    this.initializeRoutes();
  }

  public getRoutes(): IRouter {
    return this.router;
  }

  protected initializeRoutes(): void {
    // get history for video
    this.router.get(
      `${this.path}/videoId/:videoId`,
      limiter({ max: 250 }),
      verifyJwt,
      validateResource(getHistorySchema),
      this.historyController.getHistory,
    );

    // edit history
    this.router.patch(
      this.path,
      limiter(),
      verifyJwt,
      validateResource(editHistorySchema),
      this.historyController.editHistory,
    );

    // get favorites videos
    this.router.get(
      `${this.path}/favorites`,
      limiter({ max: 100 }),
      verifyJwt,
      this.historyController.getFavoriteVideos,
    );

    // get watch list
    this.router.get(
      `${this.path}/watchList`,
      limiter({ max: 100 }),
      verifyJwt,
      this.historyController.getWatchList,
    );
  }
}
