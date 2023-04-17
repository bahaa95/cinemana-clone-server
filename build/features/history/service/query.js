"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectHistory = exports.lookupToVideos = void 0;
var videos_1 = require("@/features/videos");
exports.lookupToVideos = {
    from: 'videos',
    foreignField: '_id',
    localField: 'videoId',
    as: 'video',
    pipeline: [
        { $project: videos_1.projectVideoListItem },
        { $lookup: videos_1.lookupMainCategory },
        { $unwind: '$mainCategory' },
    ],
};
exports.projectHistory = {
    _id: '$video._id',
    title: '$video.title',
    stars: '$video.stars',
    poster: '$video.poster',
    mainCategory: '$video.mainCategory',
    releaseDate: '$video.releaseDate',
};
