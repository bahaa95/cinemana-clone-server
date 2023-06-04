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
exports.deleteSeasonSchema = exports.editSeasonSchema = exports.addSeasonSchema = void 0;
var zod_1 = __importDefault(require("zod"));
var isNumber_1 = require("@/utils/isNumber");
var _idSchema = zod_1.default
    .string({
    required_error: '_id is required',
})
    .trim()
    .min(12, 'Invalid _id.')
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid _id.');
var season = {
    videoId: _idSchema,
    season: zod_1.default.preprocess(function (value) { return ((0, isNumber_1.isNumber)(value) ? Number(value) : value); }, zod_1.default
        .number({
        required_error: 'Season is required.',
        invalid_type_error: 'Season must be a number.',
    })
        .min(1, 'Season must not be less than 1')
        .max(1000, 'Season must not be greater than 1000.')),
};
exports.addSeasonSchema = zod_1.default.object({
    body: zod_1.default.object(__assign({}, season)),
});
exports.editSeasonSchema = zod_1.default.object({
    params: zod_1.default.object({
        _id: _idSchema,
    }),
    body: zod_1.default.object({ season: season.season }),
});
exports.deleteSeasonSchema = zod_1.default.object({
    params: zod_1.default.object({
        _id: _idSchema,
    }),
});
