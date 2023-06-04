"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
var httperror_1 = require("@/lib/httperror");
var UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
    },
    password: { type: String, required: true, trim: true },
}, { timestamps: true });
UserSchema.post('save', function (error, doc, next) {
    var _a, _b, _c, _d;
    // username already exists
    if (error.code === 11000) {
        if ((_a = error === null || error === void 0 ? void 0 : error.keyValue) === null || _a === void 0 ? void 0 : _a.username) {
            next(new httperror_1.HttpError({
                status: httperror_1.statuses.Conflict,
                message: "Signup failed. username ".concat((_b = error.keyValue) === null || _b === void 0 ? void 0 : _b.username, " is already exists."),
                feature: 'user',
            }));
        }
        // email already exists
        if ((_c = error === null || error === void 0 ? void 0 : error.keyValue) === null || _c === void 0 ? void 0 : _c.email) {
            next(new httperror_1.HttpError({
                status: httperror_1.statuses.Conflict,
                message: "Signup failed. email ".concat((_d = error.keyValue) === null || _d === void 0 ? void 0 : _d.email, " is already exists."),
                feature: 'user',
            }));
        }
    }
    next(error);
});
exports.User = (0, mongoose_1.model)('User', UserSchema, 'users');
