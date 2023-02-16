import {
  MediaService as TMediaService,
  Upload,
  Delete,
  Update,
  UploadMany,
} from './types';
import { cloudinary } from './config';
import { CLOUDINARY_UPLOAD_PRESET } from '@/config';

class MediaService implements TMediaService {
  private readonly uploadPreset = CLOUDINARY_UPLOAD_PRESET;

  upload: Upload = async (file, options?) => {
    const uploadResponse = await cloudinary.uploader.upload(file, {
      upload_preset: this.uploadPreset,
      ...options,
    });

    return {
      publicId: uploadResponse.public_id,
      url: uploadResponse.secure_url,
    };
  };

  delete: Delete = async (publicId, options) => {
    const deleteResponse = await cloudinary.uploader.destroy(publicId, options);
    return deleteResponse;
  };

  update: Update = async (oldFilePublicId, file, options?) => {
    // delete old file
    if (oldFilePublicId) {
      await this.delete(oldFilePublicId);
    }
    // add new file
    const fileObj = await this.upload(file, options);
    return fileObj;
  };

  uploadMany: UploadMany = async (...files) => {
    const responses = Promise.all(files.map((file) => this.upload(file)));
    return responses;
  };
}

export const mediaService = new MediaService();
