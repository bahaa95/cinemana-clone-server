import { Schema, model } from 'mongoose';
import { History as IHistory, HistoryModel } from './types';

let HistorySchema = new Schema<IHistory, HistoryModel>(
  {
    id: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    videoId: { type: Schema.Types.ObjectId, ref: 'Video' },
    favorite: { type: Boolean, required: false, default: false },
    watchList: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: false,
  },
);

HistorySchema.index({
  id: 1,
  userId: 1,
  favorite: 1,
  watchList: 1,
});

export let History = model<IHistory, HistoryModel>(
  'History',
  HistorySchema,
  'history',
);
