import { lookupMainCategory, projectVideoListItem } from '@/features/videos';

export let lookupToVideos = {
  from: 'videos',
  foreignField: '_id',
  localField: 'videoId',
  as: 'video',
  pipeline: [
    { $project: projectVideoListItem },
    { $lookup: lookupMainCategory },
    { $unwind: '$mainCategory' },
  ],
};

export let projectHistory = {
  _id: '$video._id',
  title: '$video.title',
  stars: '$video.stars',
  poster: '$video.poster',
  mainCategory: '$video.mainCategory',
  releaseDate: '$video.releaseDate',
};
