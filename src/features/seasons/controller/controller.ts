import { Request } from 'express';
import { Middleware } from '@/types';
import { HttpError, statuses } from '@/lib/httperror';
import { IVideoService } from '@/features/videos';
import { IEpisodeService } from '@/features/episodes';
import { ISeasonService } from '../service';
import { SeasonController as ISeasonController } from './types';
import { AddSeasonSchema, EditSeasonSchema } from '../validation';
import { parseSeason } from '../utils/parseSeason';
import { mediaService } from '@/lib/mediaService';
import { convertToObjectId } from '@/utils/convertToObjectId';

export class SeasonController implements ISeasonController {
  private readonly seasonService: ISeasonService;
  private readonly videoService: IVideoService;
  private readonly episodeService: IEpisodeService;

  constructor(
    _seasonService: ISeasonService,
    _videoService: IVideoService,
    _episodeService: IEpisodeService,
  ) {
    this.seasonService = _seasonService;
    this.videoService = _videoService;
    this.episodeService = _episodeService;
  }

  public addSeason: Middleware = async (
    req: Request<{}, {}, AddSeasonSchema['body']>,
    res,
    next,
  ) => {
    try {
      let data = parseSeason(req.body);

      // save season to database
      let newSeason = await this.seasonService.addSeason(data);
      res.status(201).json(newSeason);
    } catch (error) {
      next(error);
    }
  };

  public editSeason: Middleware = async (
    req: Request<any, {}, EditSeasonSchema['body']>,
    res,
    next,
  ) => {
    try {
      const _id =  convertToObjectId(req.params._id);
      let { season } = req.body;

      // edit season in database
      let editedSeason = await this.seasonService.editSeason(_id, {
        season: Number(season),
      });

      // throw HttpError if season not found
      if (!editedSeason) {
        throw new HttpError({
          status: statuses.Not_Found,
          message: `Edit failed. season with _id "${_id}" not found.`,
          feature: 'seasons',
        });
      }

      res.status(200).json(editedSeason);
    } catch (error) {
      next(error);
    }
  };

  public deleteSeason: Middleware = async (req: Request<any>, res, next) => {
    try {
      const _id =  convertToObjectId(req.params._id);

      // delete season from database
      let deletedSeason = await this.seasonService.deleteSeason(_id);

      // throw HttpError if season not found
      if (!deletedSeason) {
        throw new HttpError({
          status: statuses.Not_Found,
          message: `Delete failed. Season with _id "${_id}" not found.`,
          feature: 'seasons',
        });
      }

      // delete episodes for the season
      let episodes = await this.episodeService.deleteSeasonEpisodes(
        deletedSeason._id,
      );

      // delete images for episodes
      episodes.forEach(
        async (episode) => await mediaService.delete(episode.image.publicId),
      );

      res.status(200).json(deletedSeason);
    } catch (error) {
      next(error);
    }
  };

  public getSeasons: Middleware = async (req, res, next) => {
    try {
      // get seasons from database
      let seasons = await this.seasonService.getSeasons();
      res.status(200).json(seasons);
    } catch (error) {
      next(error);
    }
  };

  public mustBeSeries: Middleware = async (
    req: Request<{}, {}, AddSeasonSchema['body']>,
    res,
    next,
  ) => {
    try {
      let data = parseSeason(req.body);

      // get video document from database
      let video = await this.videoService.getBasicVideoDocument(data.videoId);

      // throw HttpError if video not found
      if (!video) {
        throw new HttpError({
          status: statuses.Not_Found,
          message: `video with _id "${data.videoId}" not found.`,
          feature: 'seasons',
        });
      }

      // throw HttpError if video type is movie
      if (video.type === 'movie') {
        throw new HttpError({
          status: statuses.Bad_Request,
          message: `You can not add season to video with type movie.`,
          feature: 'seasons',
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
