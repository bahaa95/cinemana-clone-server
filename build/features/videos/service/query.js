"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookupToSeasons = exports.lookupToEpisodes = exports.lookupWriters = exports.lookupDirectors = exports.lookupActors = exports.lookupToCategories = exports.lookupMainCategory = exports.projectVideoListItem = void 0;
exports.projectVideoListItem = {
    poster: 1,
    title: 1,
    stars: 1,
    mainCategory: 1,
    releaseDate: 1,
};
exports.lookupMainCategory = {
    from: 'categories',
    foreignField: '_id',
    localField: 'mainCategory',
    as: 'mainCategory',
    pipeline: [{ $project: { __v: 0 } }],
};
exports.lookupToCategories = {
    from: 'categories',
    foreignField: '_id',
    localField: 'categories',
    as: 'categories',
    pipeline: [{ $project: { __v: 0 } }],
};
exports.lookupActors = {
    from: 'staff',
    foreignField: '_id',
    localField: 'actors',
    as: 'actors',
    pipeline: [{ $project: { __v: 0, roles: 0 } }],
};
exports.lookupDirectors = {
    from: 'staff',
    foreignField: '_id',
    localField: 'directors',
    as: 'directors',
    pipeline: [{ $project: { __v: 0, roles: 0 } }],
};
exports.lookupWriters = {
    from: 'staff',
    foreignField: '_id',
    localField: 'writers',
    as: 'writers',
    pipeline: [{ $project: { __v: 0, roles: 0 } }],
};
exports.lookupToEpisodes = {
    from: 'episodes',
    foreignField: 'seasonId',
    localField: '_id',
    as: 'episodes',
    pipeline: [{ $project: { __v: 0, videoId: 0, seasonId: 0 } }],
};
exports.lookupToSeasons = {
    from: 'seasons',
    foreignField: 'videoId',
    localField: '_id',
    as: 'seasons',
    pipeline: [
        { $project: { _id: 1, season: 1 } },
        {
            $lookup: exports.lookupToEpisodes,
        },
    ],
};
