import { VideoListItem } from '@/features/videos';
import { HistoryModel } from '../model';
import { HistoryService as IHistoryService } from './types';
import { lookupToVideos, projectHistory } from './query';

export class HistoryService implements IHistoryService {
  private readonly History: HistoryModel;

  constructor(_HistoryModel: HistoryModel) {
    this.History = _HistoryModel;
  }

  /**
   * @access public cinemana-client
   */
  public editHistory: IHistoryService['editHistory'] = async (id, history) => {
    let historyDocument = await this.History.findOneAndUpdate(
      { id },
      { $set: history },
      {
        new: true,
        upsert: true,
        select: { _id: 1, favorite: 1, watchList: 1 },
      },
    );

    return historyDocument;
  };

  /**
   * @access public cinemana-client
   */
  public getFavoriteVideos: IHistoryService['getFavoriteVideos'] = async (
    userId,
  ) => {
    let favoriteVideos = await this.History.aggregate<VideoListItem>([
      { $match: { userId, favorite: true } },
      {
        $lookup: lookupToVideos,
      },
      { $unwind: '$video' },
      {
        $project: projectHistory,
      },
    ]);

    return favoriteVideos;
  };

  /**
   * @access public cinemana-client
   */
  public getWatchList: IHistoryService['getWatchList'] = async (userId) => {
    let watchList = await this.History.aggregate<VideoListItem>([
      { $match: { userId, watchList: true } },
      {
        $lookup: lookupToVideos,
      },
      { $unwind: '$video' },
      {
        $project: projectHistory,
      },
    ]);

    return watchList;
  };
}
