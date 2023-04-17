"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Administrator = void 0;
var mongoose_1 = require("mongoose");
var roles_1 = require("../roles");
var httperror_1 = require("@/lib/httperror");
var AdministratorSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
    },
    password: { type: String, required: true, trim: true },
    activated: { type: Boolean, default: false },
    roles: { type: [String], default: [roles_1.AdministratorRoles.Viewers] },
}, { timestamps: true });
AdministratorSchema.post('save', function (error, doc, next) {
    if (error.code === 11000) {
        next(new httperror_1.HttpError({
            status: httperror_1.statuses.Conflict,
            message: "Signup failed. Email is already exists.",
            feature: 'administrators',
        }));
    }
    next(error);
});
AdministratorSchema.post('findOneAndUpdate', function (error, doc, next) {
    if (error.code === 11000) {
        next(new httperror_1.HttpError({
            status: httperror_1.statuses.Conflict,
            message: "Edit account failed. Email is already exists.",
            feature: 'administrators',
        }));
    }
    next(error);
});
exports.Administrator = (0, mongoose_1.model)('Administrator', AdministratorSchema, 'administrators');
