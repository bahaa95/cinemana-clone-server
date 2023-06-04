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
exports.getGroupAndVideosSchema = exports.deleteGroupSchema = exports.editGroupSchema = exports.addGroupSchema = void 0;
var zod_1 = __importDefault(require("zod"));
var isArray_1 = require("@/utils/isArray");
var jsonParse_1 = require("@/utils/jsonParse");
var validationSchema_1 = require("@/static/validationSchema");
var group = {
    title: zod_1.default
        .string({
        invalid_type_error: 'Title must be a string type.',
        required_error: 'Title is required.',
    })
        .trim()
        .min(1, 'Title is required.')
        .max(50, 'Title must not be greater than 50 characters.')
        .regex(/^[a-zA-Z\s]+$/, 'Use only [a-z, A-Z, spaces] characters in title.'),
    videos: zod_1.default.preprocess(function (value) { return ((0, isArray_1.isArray)(value) ? (0, jsonParse_1.jsonParse)(value) : value); }, zod_1.default
        .array(zod_1.default
        .string({ invalid_type_error: 'Invalid video _id.' })
        .regex(/^[0-9a-fA-F]{24}$/, 'Invalid video _id.'), {
        required_error: 'Videos is required.',
        invalid_type_error: 'Videos must be an array.',
    })
        .min(1, 'Videos must have at least one category.')
        .max(100, 'Categories must not have more than 15 category.')),
};
var params = {
    _id: validationSchema_1.idSchema,
};
exports.addGroupSchema = zod_1.default.object({
    body: zod_1.default.object(__assign({}, group)),
});
exports.editGroupSchema = zod_1.default.object({
    params: zod_1.default.object({ _id: params._id }),
    body: zod_1.default.object(__assign({}, group)),
});
exports.deleteGroupSchema = zod_1.default.object({
    params: zod_1.default.object({ _id: params._id }),
});
exports.getGroupAndVideosSchema = zod_1.default.object({
    params: zod_1.default.object({ _id: params._id }),
});
