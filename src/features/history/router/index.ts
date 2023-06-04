import { Router } from '@/static/router';
import { limiter } from '@/middleware/limiter';
import { verifyJwt } from '@/middleware/verifyJwt';
import { validateResource } from '@/middleware/validateResource';
import { IHistoryController } from '../controller';
import { editHistorySchema, getHistorySchema } from '../validation';

export class HistoryRouter extends Router<IHistoryController> {
  constructor(historyController: IHistoryController) {
    super('/history', historyController);
    this.initializeRoutes();
  }

  protected initializeRoutes(): void {
    // get history for video
    this.router.get(
      `${this.path}/videoId/:videoId`,
      limiter({ max: 250 }),
      verifyJwt,
      validateResource(getHistorySchema),
      this.controller.getHistory,
    );

    // edit history
    this.router.patch(
      this.path,
      limiter(),
      verifyJwt,
      validateResource(editHistorySchema),
      this.controller.editHistory,
    );

    // get favorites videos
    this.router.get(
      `${this.path}/favorites`,
      limiter({ max: 100 }),
      verifyJwt,
      this.controller.getFavoriteVideos,
    );

    // get watch list
    this.router.get(
      `${this.path}/watchList`,
      limiter({ max: 100 }),
      verifyJwt,
      this.controller.getWatchList,
    );
  }
}
