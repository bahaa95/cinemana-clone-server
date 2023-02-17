export const NODE_ENV = process.env.NODE_ENV as string;

// origins
export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN as string;
export const DASHBORAD_ORIGIN = process.env.CLIENT_ORIGIN as string;

// cloudinary
export const CLOUDINARY_CLOUD_NAME = process.env
  .CLOUDINARY_CLOUD_NAME as string;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY as string;
export const CLOUDINARY_API_SECRET = process.env
  .CLOUDINARY_API_SECRET as string;
export const UPLOAD_PRESET = process.env.UPLOAD_PRESET as string;
export const CLOUDINARY_UPLOAD_PRESET = process.env
  .CLOUDINARY_UPLOAD_PRESET as string;

  // mongoDB
  export const MONGO_DB_PATH = process.env.MONGO_DB_PATH as string;

  export const NUMBER_OF_PROXIES = process.env.NUMBER_OF_PROXIES as string;