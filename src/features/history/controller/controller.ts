import { HistoryController as IHistoryController } from './types';
import { parseHistory } from '../utils/parseHistory';
import { createId } from '../utils/createId';
import { convertToObjectId } from '@/utils/convertToObjectId';
import { IHistoryService } from '../service';
import { Middleware } from '@/types';

export class HistoryController implements IHistoryController {
  private readonly historyService: IHistoryService;

  constructor(_historyService: IHistoryService) {
    this.historyService = _historyService;
  }

  public editHistory: IHistoryController['editHistory'] = async (
    req,
    res,
    next,
  ) => {
    try {
      const userId = convertToObjectId(req.User._id);
      const videoId = convertToObjectId(req.query.videoId);
      const id = createId(userId, videoId);
      let data = parseHistory(req.body);

      // edit history
      let history = await this.historyService.editHistory(id, {
        id,
        userId,
        videoId,
        ...data,
      });

      res.status(200).json(history);
    } catch (error) {
      next(error);
    }
  };

  public getFavoriteVideos: Middleware = async (req, res, next) => {
    try {
      const userId = convertToObjectId(req.User._id);

      // get favorites videos
      let favoriteVideos = await this.historyService.getFavoriteVideos(userId);

      res.status(200).json(favoriteVideos);
    } catch (error) {
      next(error);
    }
  };

  public getWatchList: Middleware = async (req, res, next) => {
    try {
      const userId = convertToObjectId(req.User._id);

      // get watch list
      let watchList = await this.historyService.getWatchList(userId);

      res.status(200).json(watchList);
    } catch (error) {
      next(error);
    }
  };
}
