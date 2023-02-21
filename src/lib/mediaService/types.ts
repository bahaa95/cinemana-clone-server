import { UploadApiOptions, UploadApiResponse } from 'cloudinary';
import { File } from '@/types';
import { Request } from 'express';

export type MediaService = {
  upload: Upload;
  delete: Delete;
  update: Update;
  uploadMany: UploadMany;
};

export type Upload = (
  file: NonNullable<Request['file']>,
  options?: UploadApiOptions | undefined,
) => Promise<File>;

export type Delete = (
  publicId: string,
  options?: DeleteApiOptions,
) => Promise<any>;

type DeleteApiOptions = {
  resource_type?: string | undefined;
  type?: string | undefined;
  invalidate?: boolean | undefined;
};

export type Update = (
  oldFilePublicId: string | undefined,
  file: NonNullable<Request['file']>,
  options?: UploadApiOptions,
) => Promise<File>;

export type UploadMany = (
  ...files: NonNullable<Request['file']>[]
) => Promise<File[]>;

export { UploadApiResponse };
