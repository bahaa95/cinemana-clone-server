"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffRole = void 0;
var mongoose_1 = require("mongoose");
var httperror_1 = require("@/lib/httperror");
var StaffRoleSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true },
}, {
    timestamps: true,
});
StaffRoleSchema.post('save', function (error, doc, next) {
    var _a;
    if (error.code === 11000) {
        next(new httperror_1.HttpError({
            status: httperror_1.statuses.Conflict,
            message: "Add role failed. role ".concat((_a = error === null || error === void 0 ? void 0 : error.keyValue) === null || _a === void 0 ? void 0 : _a.title, " is already exists."),
        }));
    }
    next(error);
});
StaffRoleSchema.post('findOneAndUpdate', function (error, doc, next) {
    var _a;
    if (error.code === 11000) {
        next(new httperror_1.HttpError({
            status: httperror_1.statuses.Conflict,
            message: "Edit role failed. role ".concat((_a = error === null || error === void 0 ? void 0 : error.keyValue) === null || _a === void 0 ? void 0 : _a.title, " is already exists."),
        }));
    }
    next(error);
});
exports.StaffRole = (0, mongoose_1.model)('StaffRole', StaffRoleSchema, 'staffRoles');
