import { projectVideoListItem, lookupMainCategory } from '@/features/videos';

export let lookupToRoles = {
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

export let lookupToVideos = (foreignField: string, as: string) => {
  return {
    from: 'videos',
    foreignField,
    localField: '_id',
    as,
    pipeline: [
      { $project: projectVideoListItem },
      { $lookup: lookupMainCategory },
      { $unwind: '$mainCategory' },
    ],
  };
};
