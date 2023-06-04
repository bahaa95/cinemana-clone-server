"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.History = void 0;
var mongoose_1 = require("mongoose");
var HistorySchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    videoId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Video' },
    favorite: { type: Boolean, required: false, default: false },
    watchList: { type: Boolean, required: false, default: false },
}, {
    timestamps: false,
});
HistorySchema.index({
    id: 1,
    userId: 1,
    favorite: 1,
    watchList: 1,
});
exports.History = (0, mongoose_1.model)('History', HistorySchema, 'history');
