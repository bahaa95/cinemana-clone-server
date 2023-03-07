import { convertToObjectId } from '@/utils/convertToObjectId';
import { AddSeasonSchema } from '../../validation';
import { ISeason } from '../../model';

export function parseSeason(season: AddSeasonSchema['body']): ISeason {
  const { videoId, season: seasonNumber } = season;

  return {
    videoId: convertToObjectId(videoId),
    season: Number(seasonNumber),
  };
}
