import { Request } from 'express';
import { mediaService } from '@/lib/mediaService';
import { ExpressFile } from '@/types';
import { EpisodeController as IEpisodeController } from './types';
import { AddEpisodeSchema, EditEpisodeSchema } from '../validation';
import { parseEpisode } from '../utils/parseEpisode';
import { IEpisodeService } from '../service';
import { convertToObjectId } from '@/utils/convertToObjectId';
import { HttpError, statuses } from '@/lib/httperror';
import { EpisodeDocument } from '../model';

export class EpisodeController implements IEpisodeController {
  private readonly episodesService: IEpisodeService;

  constructor(_episodesService: IEpisodeService) {
    this.episodesService = _episodesService;
  }

  public addEpisode: IEpisodeController['addEpisode'] = async (
    req: Request<{}, {}, AddEpisodeSchema['body']>,
    res,
    next,
  ) => {
    try {
      let data = parseEpisode(req.body);

      // add episode to database
      let episode = await this.episodesService.addEpisode(data);

      // add image to mediaService
      let image = await mediaService.upload(req.file as ExpressFile);

      // edit episode to add image
      let editedEpisode = await this.episodesService.editEpisode(episode._id, {
        image,
      });

      res.status(201).json(editedEpisode);
    } catch (error) {
      next(error);
    }
  };

  public editEpisode: IEpisodeController['editEpisode'] = async (
    req: Request<any, {}, EditEpisodeSchema['body']>,
    res,
    next,
  ) => {
    try {
      const _id = convertToObjectId(req.params._id);
      const duration = Number(req.body.duration);
      const video = req.body.video;

      // get episode from database
      let episode = await this.episodesService.getEpisodeById(_id);

      // throw HttpError if episode not found
      if (!episode) {
        throw new HttpError({
          status: statuses.Not_Found,
          message: `Episode with id ${_id} not found`,
          feature: 'episodes',
        });
      }

      // edit Episode
      let editedEpisode = (await this.episodesService.editEpisode(_id, {
        duration,
        video,
      })) as EpisodeDocument;

      // return the response if there is no image file in request
      if (!req.file) {
        res.status(200).json(editedEpisode);
        return;
      }

      // update image
      let newImage = await mediaService.update(
        episode.image.publicId,
        req.file,
      );

      // edit episode to update image
      let editedEpisode2 = (await this.episodesService.editEpisode(_id, {
        image: newImage,
      })) as EpisodeDocument;

      res.status(200).json(editedEpisode2);
    } catch (error) {
      next(error);
    }
  };

  public deleteEpisode: IEpisodeController['deleteEpisode'] = async (
    req: Request<any>,
    res,
    next,
  ) => {
    try {
      const _id = convertToObjectId(req.params._id);

      // delete episode
      let deletedEpisode = await this.episodesService.deleteEpisode(_id);

      // throw HttpError if episode not found
      if (!deletedEpisode) {
        throw new HttpError({
          status: statuses.Not_Found,
          message: `Episode with id ${_id} not found`,
          feature: 'episodes',
        });
      }

      // delete episode image from mediaService
      await mediaService.delete(deletedEpisode.image.publicId);

      res.status(200).json(deletedEpisode);
    } catch (error) {
      next(error);
    }
  };
}
