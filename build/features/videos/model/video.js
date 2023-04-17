"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Video = void 0;
var mongoose_1 = require("mongoose");
var VideoSchema = new mongoose_1.Schema({
    isPublic: { type: Boolean, default: false, required: true, index: true },
    title: { type: String, trim: true, required: true, index: true },
    description: { type: String, trim: true, required: true },
    type: {
        type: String,
        enum: ['movie', 'series'],
        required: true,
        index: true,
    },
    stars: { type: Number, required: true, default: 0 },
    releaseDate: { type: Date, required: true },
    uploadDate: { type: Date, required: true },
    isSpecial: { type: Boolean, required: true, default: false },
    specialExpire: { type: Date, required: true },
    triler: { type: String, trim: true, required: true },
    video: { type: String, trim: true, required: false },
    poster: {
        publicId: { type: String, trim: true, required: false, default: null },
        url: { type: String, trim: true, required: false, default: null },
    },
    cover: {
        publicId: { type: String, trim: true, required: false, default: null },
        url: { type: String, trim: true, required: false, default: null },
    },
    mainCategory: mongoose_1.Types.ObjectId,
    categories: { type: [mongoose_1.Types.ObjectId], index: true },
    actors: [mongoose_1.Types.ObjectId],
    directors: [mongoose_1.Types.ObjectId],
    writers: [mongoose_1.Types.ObjectId],
}, { timestamps: false });
exports.Video = (0, mongoose_1.model)('Video', VideoSchema, 'videos');
