"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEpisode = void 0;
var convertToObjectId_1 = require("@/utils/convertToObjectId");
function parseEpisode(episode) {
    var videoId = episode.videoId, seasonId = episode.seasonId, ep = episode.episode, duration = episode.duration, video = episode.video;
    return {
        videoId: (0, convertToObjectId_1.convertToObjectId)(videoId),
        seasonId: (0, convertToObjectId_1.convertToObjectId)(seasonId),
        episode: Number(ep),
        duration: Number(duration),
        video: video,
    };
}
exports.parseEpisode = parseEpisode;
