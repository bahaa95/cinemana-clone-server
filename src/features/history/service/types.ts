import { ObjectId } from '@/types';
import { VideoListItem } from '@/features/videos';
import { HistoryDocument, IHistory } from '../model';

export interface HistoryService {
  editHistory: (
    id: IHistory['id'],
    history: Partial<IHistory>,
  ) => Promise<Pick<HistoryDocument, '_id' | 'favorite' | 'watchList'>>;

  getFavoriteVideos: (userId: ObjectId) => Promise<VideoListItem[]>;

  getWatchList: (userId: ObjectId) => Promise<VideoListItem[]>;
}
