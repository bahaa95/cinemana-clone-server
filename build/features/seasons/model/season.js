"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Season = void 0;
var mongoose_1 = require("mongoose");
var httperror_1 = require("@/lib/httperror");
var SeasonSchema = new mongoose_1.Schema({
    videoId: mongoose_1.Types.ObjectId,
    season: { type: Number, required: true },
}, { timestamps: false });
SeasonSchema.index({ videoId: 1, season: 1 }, { name: 'seasonId', unique: true });
SeasonSchema.post('save', function (error, doc, next) {
    if (error.code === 11000) {
        next(new httperror_1.HttpError({
            status: httperror_1.statuses.Conflict,
            message: "Add new season failed. Season is already exists.",
            feature: 'seasons',
        }));
    }
    next(error);
});
exports.Season = (0, mongoose_1.model)('Season', SeasonSchema, 'seasons');
