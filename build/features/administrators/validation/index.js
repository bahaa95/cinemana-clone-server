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
exports.toggleActivationSchema = exports.editRolesSchema = exports.editAccountSchema = exports.signinSchema = exports.signupSchema = void 0;
var zod_1 = __importDefault(require("zod"));
var adminstrator = {
    email: zod_1.default
        .string({
        invalid_type_error: 'Email must be a string.',
        required_error: 'Email is required.',
    })
        .email('Invalid email.')
        .max(40, 'Email must not be more than 40 characters long.'),
    password: zod_1.default
        .string({
        invalid_type_error: 'Password must be a string.',
        required_error: 'Password is required.',
    })
        .min(8, 'Password must be at least 8 characters long.')
        .max(16, 'Password must not be more than 16 characters long.')
        .regex(/^\S.*[^\s]$/, 'Password must not start and end with space.'),
};
var params = zod_1.default.object({
    _id: zod_1.default
        .string({
        required_error: '_id is required',
    })
        .trim()
        .min(12, 'Invalid _id.')
        .regex(/^[0-9a-fA-F]{24}$/, 'Invalid _id.'),
});
exports.signupSchema = zod_1.default.object({
    body: zod_1.default.object(__assign({}, adminstrator)),
});
exports.signinSchema = zod_1.default.object({
    body: zod_1.default.object(__assign({}, adminstrator)),
});
exports.editAccountSchema = zod_1.default.object({
    params: params,
    body: zod_1.default.object(__assign({}, adminstrator)),
});
exports.editRolesSchema = zod_1.default.object({
    params: params,
    body: zod_1.default.object({
        roles: zod_1.default.preprocess(function (e) { return (e ? (typeof e === 'string' ? JSON.parse(e) : e) : undefined); }, zod_1.default
            .string()
            .array()
            .min(1, 'Roles must contain at least 1 role.')
            .max(3, 'Roles must not be greater than 3 role.')),
    }),
});
exports.toggleActivationSchema = zod_1.default.object({
    params: params,
});
