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
exports.getPersonSchema = exports.getPersonAndVideosSchema = exports.getStaffByRoleSchema = exports.deleteStaffSchema = exports.editStaffSchema = exports.addStaffSchema = void 0;
var zod = __importStar(require("zod"));
var person = {
    name: zod
        .string({
        invalid_type_error: 'Name must be a string.',
        required_error: 'Name is required.',
    })
        .trim()
        .min(1, 'Name must be at least 1 character long.')
        .max(40, 'Name must be at most 40 characters long.')
        .regex(/^[a-zA-Z\.\s]+$/, 'Use only [a-z, space] characters in name.'),
    roles: zod.preprocess(function (e) { return (e ? (typeof e === 'string' ? JSON.parse(e) : e) : undefined); }, zod
        .string()
        .array()
        .min(1, 'Roles must contain at least 1 role.')
        .max(3, 'Roles must not be greater than 3 role.')),
};
var params = {
    _id: zod
        .string({
        required_error: '_id is required',
    })
        .trim()
        .min(12, 'Invalid _id.')
        .regex(/^[0-9a-fA-F]{24}$/, 'Invalid _id.'),
    roleId: zod
        .string({
        required_error: 'roleId is required',
    })
        .trim()
        .min(12, 'Invalid roleId.')
        .regex(/^[0-9a-fA-F]{24}$/, 'Invalid roleId.'),
};
exports.addStaffSchema = zod.object({
    body: zod.object(__assign({}, person)),
});
exports.editStaffSchema = zod.object({
    params: zod.object({
        _id: params._id,
    }),
    body: zod.object(__assign({}, person)),
});
exports.deleteStaffSchema = zod.object({
    params: zod.object({
        _id: params._id,
    }),
});
exports.getStaffByRoleSchema = zod.object({
    params: zod.object({
        roleId: params.roleId,
    }),
});
exports.getPersonAndVideosSchema = zod.object({
    params: zod.object({
        _id: params._id,
    }),
});
exports.getPersonSchema = zod.object({
    query: zod.object({
        _id: params._id.optional(),
        name: person.name.optional(),
    }),
});
