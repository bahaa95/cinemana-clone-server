"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary = void 0;
var cloudinary_1 = __importDefault(require("cloudinary"));
var config_1 = require("@/config");
var cloudinary = cloudinary_1.default.v2;
exports.cloudinary = cloudinary;
cloudinary.config({
    cloud_name: config_1.CLOUDINARY_CLOUD_NAME,
    api_key: config_1.CLOUDINARY_API_KEY,
    api_secret: config_1.CLOUDINARY_API_SECRET,
});
