import { Schema, model, Types } from 'mongoose';
import { Season as ISeason, SeasonModel } from './types';

const SeasonSchema = new Schema<ISeason, SeasonModel>(
  {
    videoId: Types.ObjectId,
    season: { type: Number, required: true },
  },
  { timestamps: false },
);

export const Season = model<ISeason, SeasonModel>(
  'Season',
  SeasonSchema,
  'seasons',
);
