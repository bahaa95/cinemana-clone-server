import { convertToObjectId } from '@/utils/convertToObjectId';
import { AddEpisodeSchema } from '../../validation';
import { IEpisode } from '../../model';

export function parseEpisode(
  episode: AddEpisodeSchema['body'],
): Omit<IEpisode, 'image'> {
  let { videoId, seasonId, episode: ep, duration, video } = episode;

  return {
    videoId: convertToObjectId(videoId),
    seasonId: convertToObjectId(seasonId),
    episode: Number(ep),
    duration: Number(duration),
    video,
  };
}
