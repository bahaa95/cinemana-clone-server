"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSeason = void 0;
var convertToObjectId_1 = require("@/utils/convertToObjectId");
function parseSeason(season) {
    var videoId = season.videoId, seasonNumber = season.season;
    return {
        videoId: (0, convertToObjectId_1.convertToObjectId)(videoId),
        season: Number(seasonNumber),
    };
}
exports.parseSeason = parseSeason;
