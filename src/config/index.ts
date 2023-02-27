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

// access token keys
export const ACCESS_TOKEN_PRIVATE_KEY = process.env.ACCESS_TOKEN_PRIVATE_KEY as string;
export const ACCESS_TOKEN_PUBLIC_KEY = process.env.ACCESS_TOKEN_PUBLIC_KEY as string;

// refresh token keys
export const REFRESH_TOKEN_PRIVATE_KEY = process.env.REFRESH_TOKEN_PRIVATE_KEY as string;
export const REFRESH_TOKEN_PUBLIC_KEY = process.env.REFRESH_TOKEN_PUBLIC_KEY as string;