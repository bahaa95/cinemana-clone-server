import { FilterQuery } from 'mongoose';
import { convertToObjectId } from '@/utils/convertToObjectId';
import {
  IVideo,
  VideoModel,
  BasicVideoDocument,
  VideoDocument,
} from '../model';
import { SpecialVideo, VideoListItem } from '../types';
import { VideoService as IVideoService } from './types';
import {
  projectVideoListItem,
  lookupMainCategory,
  lookupCategories,
  lookupActors,
  lookupDirectors,
  lookupWriters,
} from './query';

// ! don't return the value for private method to clients and admins it's for internal usage only.
// ! only return the value for public methods.

export class VideoService implements IVideoService {
  private readonly Video: VideoModel;

  constructor(_VideoModel: VideoModel) {
    this.Video = _VideoModel;
  }

  /**
   * @private
   */
  public addVideo: IVideoService['addVideo'] = async (video) => {
    let newVideo = await new this.Video(video).save();
    return newVideo;
  };

  /**
   * @public
   */
  public editVideo: IVideoService['editVideo'] = async (_id, video) => {
    let editedVideo = await this.Video.findOneAndUpdate(
      { _id },
      {
        $set: video,
      },
      { select: { _id: 1 } },
    );

    if (!editedVideo) return null;

    let videoItem = await this.getVideoListItem(editedVideo._id);

    if (!videoItem) return null;

    return videoItem;
  };

  /**
   * @public
   */
  public deleteVideo: IVideoService['deleteVideo'] = async (_id) => {
    let video = await this.getVideoListItem(_id);

    if (!video) return null;

    await this.Video.findOneAndDelete({ _id });

    return video;
  };

  /**
   * @public
   */
  public getFullVideoDocument: IVideoService['getFullVideoDocument'] = async (
    _id,
    isClient,
  ) => {
    let filterQuery: FilterQuery<IVideo> = { _id: convertToObjectId(_id) };

    // get only public videos (isPublic=true) if the request for client
    if (isClient) {
      filterQuery.isPublic = true;
    }

    let [video] = await this.Video.aggregate<VideoDocument>([
      { $match: filterQuery },
      // lookup to categories
      {
        $lookup: lookupMainCategory,
      },
      // lookup to categories
      {
        $lookup: lookupCategories,
      },
      // lookup to staff to get actors
      {
        $lookup: lookupActors,
      },
      // lookup to staff to get directors
      {
        $lookup: lookupDirectors,
      },
      // lookup to staff to get writers
      {
        $lookup: lookupWriters,
      },
      { $project: { __v: 0 } },
      { $unwind: '$mainCategory' },
    ]);

    if (!video) return null;

    return video;
  };

  /**
   * @public
   */
  public getMovies: IVideoService['getMovies'] = async (query) => {
    let movies = await this.Video.aggregate<VideoListItem>([
      { $match: { type: 'movie', isPublic: true, ...query } },
      { $lookup: lookupMainCategory },
      {
        $project: projectVideoListItem,
      },
      { $unwind: '$mainCategory' },
    ]);

    return movies;
  };

  /**
   * @public
   */
  public getSeries: IVideoService['getSeries'] = async (query) => {
    let series = await this.Video.aggregate<VideoListItem>([
      { $match: { type: 'series', isPublic: true, ...query } },
      { $lookup: lookupMainCategory },
      {
        $project: projectVideoListItem,
      },
      { $unwind: '$mainCategory' },
    ]);

    return series;
  };

  /**
   * @public
   */
  public getSpecialVideos: IVideoService['getSpecialVideos'] = async () => {
    let specialVideos = await this.Video.aggregate<SpecialVideo>([
      {
        $match: {
          isPublic: true,
          isSpecial: true,
          specialExpire: { $gte: new Date() },
        },
      },
      { $project: { _id: 1, title: 1, description: 1, stars: 1, cover: 1 } },
    ]);

    return specialVideos;
  };

  /**
   * @public
   */
  public searchVideo: IVideoService['searchVideo'] = async (query) => {
    let videos = await this.Video.aggregate<VideoListItem>([
      { $match: { isPublic: true, ...query } },
      { $project: projectVideoListItem },
      {
        $lookup: lookupMainCategory,
      },
      { $unwind: '$mainCategory' },
    ]);

    return videos;
  };

  /**
   * @private
   */
  public getBasicVideoDocument: IVideoService['getBasicVideoDocument'] = async (
    _id,
  ) => {
    let [video] = await this.Video.aggregate<BasicVideoDocument>([
      { $match: { _id: convertToObjectId(_id) } },
    ]);

    if (!video) return null;

    return video;
  };

  /**
   * @private
   */
  public getVideoListItem: IVideoService['getVideoListItem'] = async (_id) => {
    let [video] = await this.Video.aggregate<VideoListItem>([
      { $match: { _id: convertToObjectId(_id) } },
      {
        $project: projectVideoListItem,
      },
      {
        $lookup: lookupMainCategory,
      },
      { $unwind: '$mainCategory' },
    ]);

    return video;
  };
}
