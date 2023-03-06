import { lookupToRolesQuery } from '@/features/staff';

export const projectVideoListItem = {
  poster: 1,
  title: 1,
  stars: 1,
  mainCategory: 1,
  releaseDate: 1,
};

export const lookupMainCategory = {
  from: 'categories',
  foreignField: '_id',
  localField: 'mainCategory',
  as: 'mainCategory',
  pipeline: [{ $project: { __v: 0 } }],
};

export const lookupCategories = {
  from: 'categories',
  foreignField: '_id',
  localField: 'categories',
  as: 'categories',
  pipeline: [{ $project: { __v: 0 } }],
};

export const lookupActors = {
  from: 'staff',
  foreignField: '_id',
  localField: 'actors',
  as: 'actors',
  pipeline: [{ $lookup: lookupToRolesQuery }, { $project: { __v: 0 } }],
};

export const lookupDirectors = {
  from: 'staff',
  foreignField: '_id',
  localField: 'directors',
  as: 'directors',
  pipeline: [{ $lookup: lookupToRolesQuery }, { $project: { __v: 0 } }],
};

export const lookupWriters = {
  from: 'staff',
  foreignField: '_id',
  localField: 'writers',
  as: 'writers',
  pipeline: [{ $lookup: lookupToRolesQuery }, { $project: { __v: 0 } }],
};
