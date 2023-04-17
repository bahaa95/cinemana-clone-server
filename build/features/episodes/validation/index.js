"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEpisodeSchema = exports.editEpisodeSchema = exports.addEpisodeSchema = void 0;
var zod_1 = __importDefault(require("zod"));
var validationSchema_1 = require("@/static/validationSchema");
var isNumber_1 = require("@/utils/isNumber");
var episodeSchema = {
    videoId: zod_1.default
        .string({
        required_error: 'VideoId is required.',
    })
        .trim()
        .min(12, 'Invalid videoId.')
        .regex(/^[0-9a-fA-F]{24}$/, 'Invalid videoId.'),
    seasonId: zod_1.default
        .string({
        required_error: 'SeasonId is required.',
    })
        .trim()
        .min(12, 'Invalid seasonId.')
        .regex(/^[0-9a-fA-F]{24}$/, 'Invalid seasonId.'),
    episode: zod_1.default.preprocess(function (value) { return ((0, isNumber_1.isNumber)(value) ? Number(value) : value); }, zod_1.default
        .number({
        required_error: 'Episode number is required.',
        invalid_type_error: 'Episode must be a number.',
    })
        .min(1, 'Episode number must not be less than 1.')
        .max(50000, 'Episode number must not be greater than 50000.')),
    duration: zod_1.default.preprocess(function (value) { return ((0, isNumber_1.isNumber)(value) ? Number(value) : value); }, zod_1.default
        .number({
        required_error: 'Duration number is required.',
        invalid_type_error: 'Duration must be a number.',
    })
        .min(180, 'Duration number must not be less than 180 second.')
        .max(36000, 'Duration number must not be greater than 36000 second.')),
    video: zod_1.default
        .string({
        required_error: 'Video url is required.',
        invalid_type_error: 'Video must be a string.',
    })
        .url('Invalid url.'),
};
exports.addEpisodeSchema = zod_1.default.object({
    body: zod_1.default.object(__assign({}, episodeSchema)),
});
exports.editEpisodeSchema = zod_1.default.object({
    params: zod_1.default.object({ _id: validationSchema_1.idSchema }),
    body: zod_1.default.object({
        duration: episodeSchema.duration,
        video: episodeSchema.video,
    }),
});
exports.deleteEpisodeSchema = zod_1.default.object({
    params: zod_1.default.object({ _id: validationSchema_1.idSchema }),
});
