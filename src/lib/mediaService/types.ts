import { UploadApiOptions, UploadApiResponse } from 'cloudinary';
import { File } from '@/types';

export type MediaService = {
  upload: Upload;
  delete: Delete;
  update: Update;
  uploadMany: UploadMany;
};

export type Upload = (
  file: string,
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
  file: string,
  options?: UploadApiOptions,
) => Promise<File>;

export type UploadMany = (...files: string[]) => Promise<File[]>;

export { UploadApiResponse };
