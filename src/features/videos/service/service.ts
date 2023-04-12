import { PipelineStage } from 'mongoose';
import { convertToObjectId } from '@/utils/convertToObjectId';
import { VideoModel, BasicVideoDocument, VideoDocument } from '../model';
import { SpecialVideo, VideoList, VideoListItem } from '../types';
import { VideoService as IVideoService, VideoFilterQuery } from './types';
import {
  projectVideoListItem,
  lookupMainCategory,
  lookupToCategories,
  lookupActors,
  lookupDirectors,
  lookupWriters,
  lookupToSeasons,
} from './query';

// ! don't return the value for private method to clients and admins it's for internal usage only.
// ! only return the value for public methods.

export class VideoService implements IVideoService {
  private readonly Video: VideoModel;

  constructor(_VideoModel: VideoModel) {
    this.Video = _VideoModel;
  }

  /**
   * @access private
   */
  public addVideo: IVideoService['addVideo'] = async (video) => {
    let newVideo = await new this.Video(video).save();
    return newVideo;
  };

  /**
   * @access public dashboard
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
   * @access public dashboard
   */
  public deleteVideo: IVideoService['deleteVideo'] = async (_id) => {
    let video = await this.getVideoListItem(_id);

    if (!video) return null;

    await this.Video.findOneAndDelete({ _id });

    return video;
  };

  /**
   * @access public dashboard, cinmana client
   */
  public getFullVideoDocument: IVideoService['getFullVideoDocument'] = async (
    query,
  ) => {
    // get video document
    let videoDocument = await this.getBasicVideoDocument(query._id);

    // create pipline stages
    let piplineStages: PipelineStage[] = [
      { $match: query },
      // lookup to categories
      {
        $lookup: lookupMainCategory,
      },
      // lookup to categories
      {
        $lookup: lookupToCategories,
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
    ];

    // add lookup to season stage if video is series type
    if (videoDocument?.type === 'series') {
      piplineStages = [
        ...piplineStages,
        {
          $lookup: lookupToSeasons,
        },
      ];
    }

    let [video] = await this.Video.aggregate<VideoDocument>([...piplineStages]);

    if (!video) return null;

    return video;
  };

  /**
   * @access public cinmana client
   */
  public getSimilarVideos: IVideoService['getSimilarVideos'] = async (
    query,
  ) => {
    let similarVideos = await this.Video.aggregate<VideoListItem>([
      { $match: query },
      { $sample: { size: 25 } },
      { $project: { ...projectVideoListItem } },
      { $lookup: lookupMainCategory },
      { $unwind: '$mainCategory' },
    ]);

    return similarVideos;
  };

  /**
   * @access public cinmana client
   */
  public getMovies: IVideoService['getMovies'] = async (query) => {
    let movies = await this.Video.aggregate<VideoListItem>([
      { $match: { type: 'movie', isPublic: true, ...query } },
      { $lookup: lookupMainCategory },
      {
        $project: projectVideoListItem,
      },
      { $unwind: '$mainCategory' },
      { $sort: { releaseDate: -1 } },
    ]);

    return movies;
  };

  /**
   * @access public cinmana client
   */
  public getSeries: IVideoService['getSeries'] = async (query) => {
    let series = await this.Video.aggregate<VideoListItem>([
      { $match: { type: 'series', isPublic: true, ...query } },
      { $lookup: lookupMainCategory },
      {
        $project: projectVideoListItem,
      },
      { $unwind: '$mainCategory' },
      { $sort: { releaseDate: -1 } },
    ]);

    return series;
  };

  /**
   * @access public cinmana client
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
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          stars: 1,
          cover: 1,
          uploadDate: 1,
        },
      },
      { $sort: { uploadDate: -1 } },
    ]);

    return specialVideos;
  };

  /**
   * @access public cinmana client
   */
  public searchVideo: IVideoService['searchVideo'] = async (query) => {
    let videos = await this.Video.aggregate<VideoListItem>([
      { $match: { isPublic: true, ...query } },
      { $project: projectVideoListItem },
      {
        $lookup: lookupMainCategory,
      },
      { $unwind: '$mainCategory' },
      { $sort: { releaseDate: -1 } },
    ]);

    return videos;
  };

  /**
   * @access private
   */
  public getBasicVideoDocument: IVideoService['getBasicVideoDocument'] = async (
    _id,
  ) => {
    let [video] = await this.Video.aggregate<BasicVideoDocument>([
      { $match: { _id } },
    ]);

    if (!video) return null;

    return video;
  };

  /**
   * @access private
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

    if (!video) return null;

    return video;
  };
}
