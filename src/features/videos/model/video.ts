import { Schema, model, Types } from 'mongoose';
import { Video as IVideo, VideoModel } from './types';

const VideoSchema = new Schema<IVideo, VideoModel>(
  {
    isPublic: { type: Boolean, default: false, required: true, index: true },
    title: { type: String, trim: true, required: true, index: true },
    description: { type: String, trim: true, required: true },
    type: {
      type: String,
      enum: ['movie', 'series'],
      required: true,
      index: true,
    },
    stars: { type: Number, required: true, default: 0 },
    releaseDate: { type: Date, required: true },
    uploadDate: { type: Date, required: true },
    isSpecial: { type: Boolean, required: true, default: false },
    specialExpire: { type: Date, required: true },
    triler: { type: String, trim: true, required: true },
    video: { type: String, trim: true, required: false },
    poster: {
      publicId: { type: String, trim: true, required: false, default: null },
      url: { type: String, trim: true, required: false, default: null },
    },
    cover: {
      publicId: { type: String, trim: true, required: false, default: null },
      url: { type: String, trim: true, required: false, default: null },
    },
    mainCategory: Types.ObjectId,
    categories: { type: [Types.ObjectId], index: true },
    actors: [Types.ObjectId],
    directors: [Types.ObjectId],
    writers: [Types.ObjectId],
  },
  { timestamps: false },
);

export const Video = model<IVideo, VideoModel>('Video', VideoSchema, 'videos');
