import { HydratedDocument, Model } from 'mongoose';
import { Copy } from '@/types';
import { AdministratorRoles } from '../roles';

export interface Administrator {
  email: string;
  password: string;
  activated: boolean;
  roles: AdministratorRoles[];
}

export type AdministratorDocument = Copy<HydratedDocument<Administrator>>;

export type AdministratorModel = Model<Administrator>;
