import { IRouter } from 'express';
import { HistoryRouter } from './router';
import { HistoryController } from './controller';
import { HistoryService } from './service';
import { History } from './model';

export function setupHistory(): IRouter {
  let router = new HistoryRouter(
    new HistoryController(new HistoryService(History)),
  );

  return router.getRoutes();
}
