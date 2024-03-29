import { Request } from 'express';
import { Middleware, ExpressFile } from '@/types';
import { mediaService } from '@/lib/mediaService';
import { HttpError, statuses } from '@/lib/httperror';
import { convertToObjectId } from '@/utils/convertToObjectId';
import { IStaffService, StaffFilterQuery } from '../service';
import { StaffController as IStaffController } from './types';
import {
  AddStaffSchema,
  EditStaffSchema,
  GetPersonSchema,
} from '../validation';
import { parseRoles } from '../utils/parsRoles';
import { uniqueVideos } from '../utils/uniqueVideos';

export class StaffController implements IStaffController {
  private readonly staffService: IStaffService;

  constructor(_staffService: IStaffService) {
    this.staffService = _staffService;
  }

  public addPerson: Middleware = async (
    req: Request<{}, {}, AddStaffSchema['body']>,
    res,
    next,
  ) => {
    try {
      let { name, roles } = req.body;
      // add person to database
      let newPerson = await this.staffService.addPerson({
        name,
        roles: parseRoles(roles),
      });

      // upload person image to mediaService
      let image = await mediaService.upload(req.file as ExpressFile);

      // add uploaded image to person
      let person = await this.staffService.editPerson(newPerson._id, {
        image,
      });
      res.status(201).json(person);
    } catch (error) {
      next(error);
    }
  };

  public editPerson: Middleware = async (
    req: Request<any, {}, EditStaffSchema['body']>,
    res,
    next,
  ) => {
    try {
      const _id = convertToObjectId(req.params._id);
      let { name, roles } = req.body;

      // edit person in database
      let editedPerson = await this.staffService.editPerson(_id, {
        name,
        roles: parseRoles(roles),
      });

      // throw HttpError if person is not found
      if (!editedPerson) {
        throw new HttpError({
          status: statuses.Not_Found,
          message: 'Person not found.',
        });
      }

      // return response if there is no file in req (person image will not update)
      if (!req.file) {
        res.status(200).json(editedPerson);
        return;
      }

      // update image in mediaService
      let image = await mediaService.update(
        editedPerson.image.publicId,
        req.file as ExpressFile,
      );

      // update person image in database
      let person = await this.staffService.editPerson(editedPerson._id, {
        image,
      });

      res.status(200).json(person);
    } catch (error) {
      next(error);
    }
  };

  public deletePerson: Middleware = async (req: Request<any>, res, next) => {
    try {
      const _id = convertToObjectId(req.params._id);

      // delete person from database
      let deletePerson = await this.staffService.deletePerson(_id);

      // throw HttpError if person is not found
      if (!deletePerson) {
        throw new HttpError({
          status: statuses.Not_Found,
          message: 'Person not found.',
        });
      }

      // delete person image from mediaService
      await mediaService.delete(deletePerson?.image.publicId);
      res.status(200).json(deletePerson);
    } catch (error) {
      next(error);
    }
  };

  public getStaff: Middleware = async (req, res, next) => {
    try {
      let staff = await this.staffService.getStaff();
      res.status(200).json(staff);
    } catch (error) {
      next(error);
    }
  };

  public getStaffByRole: Middleware = async (req: Request<any>, res, next) => {
    try {
      const roleId = convertToObjectId(req.params.roleId);
      let staff = await this.staffService.getStaffByRole(roleId);
      res.status(200).json(staff);
    } catch (error) {
      next(error);
    }
  };

  public getPersonAndVideos: Middleware = async (
    req: Request<any>,
    res,
    next,
  ) => {
    try {
      const _id = convertToObjectId(req.params._id);

      let person = await this.staffService.getPersonWithVideos(_id);

      // throw HttpError if person is not found
      if (!person) {
        throw new HttpError({
          status: statuses.Not_Found,
          message: 'Person not found.',
          feature: 'staff',
        });
      }

      let { actorVideos, dierctorVideos, writerVideos, ...personInfo } = person;
      let videos = uniqueVideos([
        ...actorVideos,
        ...dierctorVideos,
        ...writerVideos,
      ]);

      res.status(200).json({ ...personInfo, videos });
    } catch (error) {
      next(error);
    }
  };

  public getPerson: Middleware = async (
    req: Request<{}, {}, {}, GetPersonSchema['query']>,
    res,
    next,
  ) => {
    try {
      const { _id, name } = req.query;

      let query: StaffFilterQuery = {};

      if (_id) query._id = _id;
      if (name) query.name = name;

      // get person
      let person = await this.staffService.getPerson(query);

      // throw HttpError if person not found
      if (!person) {
        throw new HttpError({ status: statuses.Not_Found });
      }

      res.status(200).json(person);
    } catch (error) {
      next(error);
    }
  };
}
