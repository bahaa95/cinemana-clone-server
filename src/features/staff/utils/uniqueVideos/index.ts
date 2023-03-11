import { VideoListItem } from '@/features/videos';

export function uniqueVideos(videos: VideoListItem[]): VideoListItem[] {
  return videos.filter(
    (obj, index) =>
      videos.findIndex((item) => item.title === obj.title) === index,
  );
}
