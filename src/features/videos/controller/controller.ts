import { Request } from 'express';
import { Middleware, File } from '@/types';
import { mediaService } from '@/lib/mediaService';
import { ISeasonService } from '@/features/seasons';
import { IEpisodeService } from '@/features/episodes';
import { HttpError, statuses } from '@/lib/httperror';
import { convertToObjectId } from '@/utils/convertToObjectId';
import bear from '@/lib/bear/array';
import { VideoController as IVideoController, VideoFiles } from './types';
import { IVideoService, VideoFilterQuery } from '../service';
import {
  AddVideoSchema,
  EditVideoSchema,
  GetMoviesSchema,
  GetSeriesSchema,
  SearchSchema,
} from '../validation';
import { jsonParseVideo } from '../utils/jsonParseVideo';
import { BasicVideoDocument } from '../model';

export class VideoController implements IVideoController {
  private readonly videoService: IVideoService;
  private readonly seasonService: ISeasonService;
  private readonly episodeService: IEpisodeService;

  constructor(
    _videoService: IVideoService,
    _seasonService: ISeasonService,
    _episodeService: IEpisodeService,
  ) {
    this.videoService = _videoService;
    this.seasonService = _seasonService;
    this.episodeService = _episodeService;
  }

  public addVideo: Middleware = async (
    req: Request<{}, {}, AddVideoSchema['body']>,
    res,
    next,
  ) => {
    try {
      let data = jsonParseVideo(req.body);

      // add video to database
      let newVideo = await this.videoService.addVideo(data);

      // upload poster and cover to media service
      let files = req.files as VideoFiles;

      let [poster, cover] = await mediaService.uploadMany(
        files['poster'][0],
        files['cover'][0],
      );

      // save uploaded image to database
      let editedVideo = await this.videoService.editVideo(newVideo._id, {
        poster,
        cover,
      });

      res.status(201).json(editedVideo);
    } catch (error) {
      next(error);
    }
  };

  public deleteVideo: Middleware = async (req: Request<any>, res, next) => {
    try {
      const _id = convertToObjectId(req.params._id);

      // get video document before delete it
      let video = await this.videoService.getBasicVideoDocument(_id);

      // throw HttpError if video not found
      if (!video) {
        throw new HttpError({
          status: statuses.Not_Found,
          message: `Video with id ${_id} not found.`,
          feature: 'videos',
        });
      }

      // delete video
      let deletedVideo = await this.videoService.deleteVideo(_id);

      // delete poster and cover for video from mediaService
      await mediaService.delete(video.poster.publicId);
      await mediaService.delete(video.cover.publicId);

      // return response if video type is movie
      if (video.type === 'movie') {
        res.status(200).json(deletedVideo);
        return;
      }

      // if video type is series delete its seasons and episodes
      // delete seasons for video
      await this.seasonService.deleteVideoSeasons(video._id);

      // delete episodes
      let episodes = await this.episodeService.deleteVideoEpisodes(video._id);

      // delete images for episodes
      episodes.forEach(
        async (episode) => await mediaService.delete(episode.image.publicId),
      );

      // return response
      res.status(200).json(deletedVideo);
    } catch (error) {
      next(error);
    }
  };

  public editVideo: Middleware = async (
    req: Request<any, {}, EditVideoSchema['body']>,
    res,
    next,
  ) => {
    try {
      const _id = convertToObjectId(req.params._id);
      let data = jsonParseVideo(req.body);
      let files = req.files as VideoFiles;

      // get video before editting
      let video = await this.videoService.getBasicVideoDocument(_id);

      // throw HttpError if video not found
      if (!video) {
        throw new HttpError({
          status: statuses.Not_Found,
          message: `Video with id ${_id} not found.`,
          feature: 'videos',
        });
      }

      // edit video
      let editedVideo = await this.videoService.editVideo(_id, data);

      // return response if there is no poster and cover files to update
      if (!files['poster'] && !files['cover']) {
        res.status(200).json(editedVideo);
        return;
      }

      // update poster and cover in mediaService
      let poster: File | undefined;
      let cover: File | undefined;

      if (files['poster']) {
        poster = await mediaService.update(
          video.poster.publicId,
          files['poster'][0],
        );
      }

      if (files['cover']) {
        cover = await mediaService.update(
          video.cover.publicId,
          files['cover'][0],
        );
      }

      // update poster and cover in database
      let editedVideo2 = await this.videoService.editVideo(_id, {
        poster: poster || video.poster,
        cover: cover || video.cover,
      });

      res.status(200).json(editedVideo2);
    } catch (error) {
      next(error);
    }
  };

  public getVideo: Middleware = async (req: Request<any>, res, next) => {
    try {
      const _id = convertToObjectId(req.params._id);

      let filterQuery: VideoFilterQuery = { _id: convertToObjectId(_id) };

      // check if the request for client
      const isClient = !req.originalUrl.split('/').includes('admin');

      // get only public videos (isPublic=true) if the request for client
      if (isClient) {
        filterQuery.isPublic = true;
      }

      // get the video from database
      let video = await this.videoService.getFullVideoDocument(filterQuery);

      // throw HttpError if video not found
      if (!video) {
        throw new HttpError({
          status: statuses.Not_Found,
          message: `Video with id ${_id} not found.`,
          feature: 'videos',
        });
      }

      // get basic video document to use it for git similar videos
      let basicVideoDocument = (await this.videoService.getBasicVideoDocument(
        _id,
      )) as BasicVideoDocument;

      // get similar videos list
      let similarVideos = await this.videoService.getSimilarVideos({
        $and: [
          { isPublic: true },
          { type: basicVideoDocument.type },
          { _id: { $ne: basicVideoDocument._id } },
          { mainCategory: { $in: basicVideoDocument.categories } },
        ],
      });

      res.status(200).json({ video, similarVideos });
    } catch (error) {
      next(error);
    }
  };

  public getMovies: Middleware = async (
    req: Request<{}, {}, {}, GetMoviesSchema['query']>,
    res,
    next,
  ) => {
    try {
      let { categoryId } = req.query;
      let query: VideoFilterQuery | undefined;

      if (categoryId)
        query = { ...query, categories: convertToObjectId(categoryId) };

      // get movies from database
      let movies = await this.videoService.getMovies(query);

      res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  };

  public getSeries: Middleware = async (
    req: Request<{}, {}, {}, GetSeriesSchema['query']>,
    res,
    next,
  ) => {
    try {
      let { categoryId } = req.query;
      let query: VideoFilterQuery | undefined;

      if (categoryId)
        query = { ...query, categories: convertToObjectId(categoryId) };

      // get series from database
      let series = await this.videoService.getSeries(query);

      res.status(200).json(series);
    } catch (error) {
      next(error);
    }
  };

  public getSpecialVideos: Middleware = async (req, res, next) => {
    try {
      let specialVideos = await this.videoService.getSpecialVideos();
      res.status(200).json(specialVideos);
    } catch (error) {
      next(error);
    }
  };

  public searchVideo: Middleware = async (
    req: Request<{}, {}, {}, SearchSchema['query']>,
    res,
    next,
  ) => {
    try {
      const { title, type, category, stars, year } = req.query;
      let query: VideoFilterQuery | undefined;

      // add title to query
      if (title) {
        query = { title: { $regex: title, $options: 'i' }, ...query };
      }

      // add type to query
      if (type) {
        query = { ...query, type };
      }

      // add category to query
      if (category) {
        query = { ...query, categories: convertToObjectId(category) };
      }

      // add stars to query
      if (stars) {
        query = { ...query, stars: { $gte: Number(stars) } };
      }

      // add year to query
      if (year && year.split(',').length === 2) {
        const [fromYear, toYear] = year.split(',');
        query = {
          ...query,
          $and: [
            { releaseDate: { $gte: new Date(Number(fromYear.trim()), 0, 1) } },
            { releaseDate: { $lte: new Date(Number(toYear.trim()), 11, 31) } },
          ],
        };
      }

      // get search results from database
      let searchResults = await this.videoService.searchVideo(query);

      res.status(200).json(searchResults);
    } catch (error) {
      next(error);
    }
  };
}
