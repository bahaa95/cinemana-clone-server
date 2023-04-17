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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoleSchema = exports.editRoleSchema = exports.addRoleSchema = void 0;
var zod = __importStar(require("zod"));
var role = {
    title: zod
        .string({
        invalid_type_error: 'Title must be a string.',
        required_error: 'Title is required.',
    })
        .trim()
        .min(3, 'Title must be at least 3 characters long.')
        .max(25, 'Title must not be more than 25 characters long.')
        .regex(/^[a-z]+$/, 'Use only [a-z] characters in title.'),
};
var params = {
    _id: zod
        .string({
        required_error: '_id is required',
    })
        .trim()
        .min(12, 'Invalid _id.')
        .regex(/^[0-9a-fA-F]{24}$/, 'Invalid _id.'),
};
exports.addRoleSchema = zod.object({
    body: zod.object(__assign({}, role)),
});
exports.editRoleSchema = zod.object({
    params: zod.object({
        _id: params._id,
    }),
    body: zod.object(__assign({}, role)),
});
exports.deleteRoleSchema = zod.object({
    params: zod.object({
        _id: params._id,
    }),
});
