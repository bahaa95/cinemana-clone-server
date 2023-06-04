"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idSchema = void 0;
var zod_1 = __importDefault(require("zod"));
exports.idSchema = zod_1.default
    .string({
    required_error: '_id is required',
})
    .trim()
    .min(12, 'Invalid _id.')
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid _id.');
