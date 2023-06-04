"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookupToVideos = exports.lookupToRoles = void 0;
var videos_1 = require("@/features/videos");
exports.lookupToRoles = {
    from: 'staffRoles',
    localField: 'roles',
    foreignField: '_id',
    as: 'roles',
    pipeline: [
        {
            $project: { _id: 1, title: 1 },
        },
    ],
};
var lookupToVideos = function (foreignField, as) {
    return {
        from: 'videos',
        foreignField: foreignField,
        localField: '_id',
        as: as,
        pipeline: [
            { $project: videos_1.projectVideoListItem },
            { $lookup: videos_1.lookupMainCategory },
            { $unwind: '$mainCategory' },
        ],
    };
};
exports.lookupToVideos = lookupToVideos;
