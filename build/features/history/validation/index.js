"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistorySchema = exports.editHistorySchema = void 0;
var zod_1 = __importDefault(require("zod"));
var isBoolean_1 = require("@/utils/isBoolean");
var jsonParse_1 = require("@/utils/jsonParse");
var history = {
    videoId: zod_1.default
        .string({
        required_error: 'VideoId required.',
        invalid_type_error: 'Invalid videoId.',
    })
        .regex(/^[0-9a-fA-F]{24}$/, 'Invalid videoId.'),
    favorite: zod_1.default.preprocess(function (value) { return ((0, isBoolean_1.isBoolean)(value) ? (0, jsonParse_1.jsonParse)(value) : value); }, zod_1.default
        .boolean({ invalid_type_error: 'Favorite must be boolean type.' })
        .optional()),
    watchList: zod_1.default.preprocess(function (value) { return ((0, isBoolean_1.isBoolean)(value) ? (0, jsonParse_1.jsonParse)(value) : value); }, zod_1.default
        .boolean({ invalid_type_error: 'WatchList must be boolean type.' })
        .optional()),
};
exports.editHistorySchema = zod_1.default.object({
    query: zod_1.default.object({
        videoId: history.videoId,
    }),
    body: zod_1.default.object({
        favorite: history.favorite,
        watchList: history.watchList,
    }),
});
exports.getHistorySchema = zod_1.default.object({
    params: zod_1.default.object({
        videoId: history.videoId,
    }),
});
