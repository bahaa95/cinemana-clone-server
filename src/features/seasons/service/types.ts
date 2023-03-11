import { SeasonDocument, ISeason } from '../model';
import { ObjectId } from '@/types';

export interface SeasonService {
  addSeason: (season: ISeason) => Promise<SeasonDocument>;

  editSeason: (
    _id: ObjectId,
    season: Partial<ISeason>,
  ) => Promise<SeasonDocument | null>;

  deleteSeason: (_id: ObjectId) => Promise<SeasonDocument | null>;

  deleteVideoSeasons: (videoId: ObjectId) => Promise<void>;

  getSeasons: () => Promise<SeasonDocument[]>;
}
