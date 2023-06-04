"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
var mongoose_1 = require("mongoose");
var httperror_1 = require("@/lib/httperror");
var GroupSchema = new mongoose_1.Schema({
    title: { type: String, trim: true, required: true, unique: true },
    videos: { type: [mongoose_1.Types.ObjectId], required: true },
}, { timestamps: true });
GroupSchema.post('save', function (error, doc, next) {
    var _a;
    if (error.code === 11000) {
        next(new httperror_1.HttpError({
            status: httperror_1.statuses.Conflict,
            message: "Group ".concat((_a = error === null || error === void 0 ? void 0 : error.keyValue) === null || _a === void 0 ? void 0 : _a.title, " is already exists."),
            feature: 'groups',
        }));
    }
    next(error);
});
GroupSchema.post('findOneAndUpdate', function (error, doc, next) {
    var _a;
    if (error.code === 11000) {
        next(new httperror_1.HttpError({
            status: httperror_1.statuses.Conflict,
            message: "Group ".concat((_a = error === null || error === void 0 ? void 0 : error.keyValue) === null || _a === void 0 ? void 0 : _a.title, " is already exists."),
            feature: 'groups',
        }));
    }
    next(error);
});
exports.Group = (0, mongoose_1.model)('Group', GroupSchema, 'groups');
