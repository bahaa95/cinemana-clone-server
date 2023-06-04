"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategorySchema = exports.editCategorySchema = exports.addCategorySchema = void 0;
var zod_1 = __importDefault(require("zod"));
var body = zod_1.default.object({
    title: zod_1.default
        .string({
        invalid_type_error: 'Title must be a string.',
        required_error: 'Title is required.',
    })
        .trim()
        .min(3, 'Title must be at least 3 characters long.')
        .max(50, 'Title must not be more than 50 characters long.')
        .regex(/^[a-z\s]+$/, 'Use only [a-z, space] characters in title.'),
});
var params = zod_1.default.object({
    _id: zod_1.default
        .string({
        required_error: '_id is required',
    })
        .trim()
        .min(12, 'Invalid _id.')
        .regex(/^[0-9a-fA-F]{24}$/, 'Invalid _id.'),
});
exports.addCategorySchema = zod_1.default.object({
    body: body,
});
exports.editCategorySchema = zod_1.default.object({
    params: params,
    body: body,
});
exports.deleteCategorySchema = zod_1.default.object({
    params: params,
});
