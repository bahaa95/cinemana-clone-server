import { Request, Response, NextFunction } from 'express';
import { Middleware } from '@/types';
import { EditHistorySchema } from '../validation';

export interface HistoryController {
  editHistory: (
    req: Request<{}, {}, EditHistorySchema['body'], EditHistorySchema['query']>,
    res: Response,
    next: NextFunction,
  ) => Promise<void> | void;

  getFavoriteVideos: Middleware;

  getWatchList: Middleware;
}
