"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Episode = void 0;
var mongoose_1 = require("mongoose");
var httperror_1 = require("@/lib/httperror");
var EpisodeSchema = new mongoose_1.Schema({
    videoId: mongoose_1.Types.ObjectId,
    seasonId: mongoose_1.Types.ObjectId,
    episode: { type: Number, required: true },
    duration: { type: Number, required: true },
    video: { type: String, required: true },
    image: {
        publicId: { type: String, required: false, default: null },
        url: { type: String, required: false, default: null },
    },
}, { timestamps: false });
EpisodeSchema.index({ videoId: 1, seasonId: 1, episode: 1 }, { name: 'episodeId', unique: true });
EpisodeSchema.post('save', function (error, doc, next) {
    if (error.code === 11000) {
        next(new httperror_1.HttpError({
            status: httperror_1.statuses.Conflict,
            message: "Add new episode failed. episode  is already exists.",
            feature: 'episodes',
        }));
    }
    next(error);
});
exports.Episode = (0, mongoose_1.model)('Episode', EpisodeSchema, 'episodes');
