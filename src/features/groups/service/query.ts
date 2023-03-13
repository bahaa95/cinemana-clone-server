import { lookupMainCategory, projectVideoListItem } from '@/features/videos';

export let lookupToVideos = {
  from: 'videos',
  foreignField: '_id',
  localField: 'videos',
  as: 'videos',
  pipeline: [
    { $project: projectVideoListItem },
    { $lookup: lookupMainCategory },
    { $unwind: '$mainCategory' },
  ],
};
