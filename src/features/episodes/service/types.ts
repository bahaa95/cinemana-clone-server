import { ObjectId } from '@/types';
import { IEpisode, EpisodeDocument } from '../model';

export interface EpisodeService {
  addEpisode: (episode: Omit<IEpisode, 'image'>) => Promise<EpisodeDocument>;

  editEpisode: (
    _id: ObjectId,
    episode: Partial<IEpisode>,
  ) => Promise<EpisodeDocument | null>;

  deleteEpisode: (_id: ObjectId) => Promise<EpisodeDocument | null>;

  deleteSeasonEpisodes: (seasonId: ObjectId) => Promise<EpisodeDocument[]>;

  deleteVideoEpisodes: (videoId: ObjectId) => Promise<EpisodeDocument[]>;

  getEpisodeById: (_id: ObjectId) => Promise<EpisodeDocument | null>;
}
