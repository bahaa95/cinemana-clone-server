"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_TOKEN_PUBLIC_KEY = exports.REFRESH_TOKEN_PRIVATE_KEY = exports.SENTRY_DSN = exports.ACCESS_TOKEN_PUBLIC_KEY = exports.ACCESS_TOKEN_PRIVATE_KEY = exports.NUMBER_OF_PROXIES = exports.MONGO_DB_PATH = exports.CLOUDINARY_UPLOAD_PRESET = exports.UPLOAD_PRESET = exports.CLOUDINARY_API_SECRET = exports.CLOUDINARY_API_KEY = exports.CLOUDINARY_CLOUD_NAME = exports.DASHBORAD_ORIGIN = exports.CLIENT_ORIGIN = exports.NODE_ENV = void 0;
exports.NODE_ENV = process.env.NODE_ENV;
// origins
exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;
exports.DASHBORAD_ORIGIN = process.env.CLIENT_ORIGIN;
// cloudinary
exports.CLOUDINARY_CLOUD_NAME = process.env
    .CLOUDINARY_CLOUD_NAME;
exports.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
exports.CLOUDINARY_API_SECRET = process.env
    .CLOUDINARY_API_SECRET;
exports.UPLOAD_PRESET = process.env.UPLOAD_PRESET;
exports.CLOUDINARY_UPLOAD_PRESET = process.env
    .CLOUDINARY_UPLOAD_PRESET;
// mongoDB
exports.MONGO_DB_PATH = process.env.MONGO_DB_PATH;
exports.NUMBER_OF_PROXIES = process.env.NUMBER_OF_PROXIES;
// access token keys
exports.ACCESS_TOKEN_PRIVATE_KEY = process.env
    .ACCESS_TOKEN_PRIVATE_KEY;
exports.ACCESS_TOKEN_PUBLIC_KEY = process.env
    .ACCESS_TOKEN_PUBLIC_KEY;
// sentry
exports.SENTRY_DSN = process.env.SENTRY_DSN;
// refresh token keys
exports.REFRESH_TOKEN_PRIVATE_KEY = process.env
    .REFRESH_TOKEN_PRIVATE_KEY;
exports.REFRESH_TOKEN_PUBLIC_KEY = process.env
    .REFRESH_TOKEN_PUBLIC_KEY;
