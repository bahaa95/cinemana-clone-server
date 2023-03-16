import { Schema, model, Types } from 'mongoose';
import { Season as ISeason, SeasonModel, SeasonDocument } from './types';
import { HttpError, statuses } from '@/lib/httperror';

const SeasonSchema = new Schema<ISeason, SeasonModel>(
  {
    videoId: Types.ObjectId,
    season: { type: Number, required: true },
  },
  { timestamps: false },
);

SeasonSchema.index(
  { videoId: 1, season: 1 },
  { name: 'seasonId', unique: true },
);

SeasonSchema.post('save', (error: any, doc: SeasonDocument, next: any) => {
  if (error.code === 11000) {
    next(
      new HttpError({
        status: statuses.Conflict,
        message: `Add new season failed. Season is already exists.`,
        feature: 'seasons',
      }),
    );
  }

  next(error);
});

export const Season = model<ISeason, SeasonModel>(
  'Season',
  SeasonSchema,
  'seasons',
);
