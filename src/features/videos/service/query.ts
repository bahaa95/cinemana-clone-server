import { lookupToRolesQuery } from '@/features/staff';

export let projectVideoListItem = {
  poster: 1,
  title: 1,
  stars: 1,
  mainCategory: 1,
  releaseDate: 1,
};

export let lookupMainCategory = {
  from: 'categories',
  foreignField: '_id',
  localField: 'mainCategory',
  as: 'mainCategory',
  pipeline: [{ $project: { __v: 0 } }],
};

export let lookupToCategories = {
  from: 'categories',
  foreignField: '_id',
  localField: 'categories',
  as: 'categories',
  pipeline: [{ $project: { __v: 0 } }],
};

export let lookupActors = {
  from: 'staff',
  foreignField: '_id',
  localField: 'actors',
  as: 'actors',
  pipeline: [{ $lookup: lookupToRolesQuery }, { $project: { __v: 0 } }],
};

export let lookupDirectors = {
  from: 'staff',
  foreignField: '_id',
  localField: 'directors',
  as: 'directors',
  pipeline: [{ $lookup: lookupToRolesQuery }, { $project: { __v: 0 } }],
};

export let lookupWriters = {
  from: 'staff',
  foreignField: '_id',
  localField: 'writers',
  as: 'writers',
  pipeline: [{ $lookup: lookupToRolesQuery }, { $project: { __v: 0 } }],
};

export let lookupToEpisodes = {
  from: 'episodes',
  foreignField: 'seasonId',
  localField: '_id',
  as: 'episodes',
  pipeline: [{ $project: { __v: 0, videoId: 0, seasonId: 0 } }],
};

export let lookupToSeasons = {
  from: 'seasons',
  foreignField: 'videoId',
  localField: '_id',
  as: 'seasons',
  pipeline: [
    { $project: { _id: 1, season: 1 } },
    {
      $lookup: lookupToEpisodes,
    },
  ],
};
