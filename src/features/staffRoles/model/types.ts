import { HydratedDocument, Model } from 'mongoose';
import { Copy } from '@/types';

export interface StaffRole {
  title: string;
}

export type StaffRoleDocument = Copy<HydratedDocument<StaffRole>>;

export type StaffRoleModel = Model<StaffRole>;
