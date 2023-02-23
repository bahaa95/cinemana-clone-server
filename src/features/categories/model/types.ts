import { HydratedDocument, Model } from 'mongoose';
import { Copy } from '@/types';

export interface Category {
  title: string;
}

export type CategoryDocument = Copy<HydratedDocument<Category>>;
export type CategoryModel = Model<Category>;
