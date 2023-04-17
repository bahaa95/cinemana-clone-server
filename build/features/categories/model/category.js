"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
var mongoose_1 = require("mongoose");
var httperror_1 = require("@/lib/httperror");
var CategorySchema = new mongoose_1.Schema({
    title: { type: String, trim: true, required: true, unique: true },
}, { timestamps: false });
CategorySchema.post('save', function (error, doc, next) {
    var _a;
    if (error.code === 11000) {
        next(new httperror_1.HttpError({
            status: httperror_1.statuses.Conflict,
            message: "Add new category failed. Category with title ".concat((_a = error === null || error === void 0 ? void 0 : error.keyValue) === null || _a === void 0 ? void 0 : _a.title, " is already exists."),
            feature: 'categories',
        }));
    }
    next(error);
});
CategorySchema.post('findOneAndUpdate', function (error, doc, next) {
    var _a;
    if (error.code === 11000) {
        next(new httperror_1.HttpError({
            status: httperror_1.statuses.Conflict,
            message: "Edit category failed. Category with title ".concat((_a = error === null || error === void 0 ? void 0 : error.keyValue) === null || _a === void 0 ? void 0 : _a.title, " is already exists."),
            feature: 'categories',
        }));
    }
    next(error);
});
exports.Category = (0, mongoose_1.model)('Category', CategorySchema, 'categories');