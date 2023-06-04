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
exports.signinSchema = exports.signupSchema = void 0;
var zod_1 = __importDefault(require("zod"));
var user = {
    email: zod_1.default
        .string({
        invalid_type_error: 'Email must be a string.',
        required_error: 'Email is required.',
    })
        .email('Invalid email.')
        .max(40, 'Email must not be more than 40 characters long.'),
    username: zod_1.default
        .string({
        invalid_type_error: 'Username must be a string.',
        required_error: 'Username is required.',
    })
        .min(3, 'Username must not be less than 3 characters long.')
        .max(25, 'Username must not be more than 25 characters long.')
        .regex(/^[a-zA-Z_]{1,}[a-zA-Z0-9_]+$/, 'Username must contain only [a-z,A-Z,0-9,_] characters. and start with a letter.'),
    password: zod_1.default
        .string({
        invalid_type_error: 'Password must be a string.',
        required_error: 'Password is required.',
    })
        .min(6, 'Password must be at least 6 characters long.')
        .max(16, 'Password must not be more than 16 characters long.')
        .regex(/^\S.*[^\s]$/, 'Password must not start and end with space.'),
};
exports.signupSchema = zod_1.default.object({
    body: zod_1.default.object(__assign({}, user)),
});
exports.signinSchema = zod_1.default.object({
    body: zod_1.default.object({
        email: user.email,
        password: user.password,
    }),
});
