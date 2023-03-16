import { Schema, model, Types } from 'mongoose';
import { Episode as IEpisode, EpisodeModel,EpisodeDocument } from './types';
import { HttpError, statuses } from '@/lib/httperror';

let EpisodeSchema = new Schema<IEpisode, EpisodeModel>(
  {
    videoId: Types.ObjectId,
    seasonId: Types.ObjectId,
    episode: { type: Number, required: true },
    duration: { type: Number, required: true },
    video: { type: String, required: true },
    image: {
      publicId: { type: String, required: false, default: null },
      url: { type: String, required: false, default: null },
    },
  },
  { timestamps: false },
);

EpisodeSchema.index(
  { videoId: 1, seasonId: 1, episode: 1 },
  { name: 'episodeId', unique: true },
);

EpisodeSchema.post('save', (error: any, doc: EpisodeDocument, next: any) => {
  if (error.code === 11000) {
    next(
      new HttpError({
        status: statuses.Conflict,
        message: `Add new episode failed. episode  is already exists.`,
        feature: 'episodes',
      }),
    );
  }

  next(error);
});

export let Episode = model<IEpisode, EpisodeModel>(
  'Episode',
  EpisodeSchema,
  'episodes',
);
