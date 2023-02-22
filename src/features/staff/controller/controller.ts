import { Request } from 'express';
import { Middleware, ExpressFile, ObjectId } from '@/types';
import { mediaService } from '@/lib/mediaService';
import { IStaffService } from '../service';
import { StaffController as IStaffController } from './types';
import { AddPersonSchema, EditPersonSchema } from '../types';
import { parseRoles } from '../utils/parsRoles';
import { HttpError, statuses } from '@/lib/httperror';

export class StaffController implements IStaffController {
  private readonly staffService: IStaffService;

  constructor(_staffService: IStaffService) {
    this.staffService = _staffService;
  }

  addPerson: Middleware = async (
    req: Request<{}, {}, AddPersonSchema['body']>,
    res,
    next,
  ) => {
    try {
      const data = req.body;
      // add person to database
      const newPerson = await this.staffService.addPerson({
        name: data.name,
        roles: parseRoles(data.roles),
      });

      // upload person image to mediaService
      const image = await mediaService.upload(req.file as ExpressFile);

      // add uploaded image to person
      const person = await this.staffService.editPerson(newPerson._id, {
        image,
      });
      res.status(201).json(person);
    } catch (error) {
      next(error);
    }
  };

  editPerson: Middleware = async (
    req: Request<any, {}, EditPersonSchema['body']>,
    res,
    next,
  ) => {
    try {
      const _id = req.params._id as ObjectId;
      const data = req.body;

      // edit person in database
      const editedPerson = await this.staffService.editPerson(_id, {
        ...data,
        roles: parseRoles(data.roles),
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
      const image = await mediaService.update(
        editedPerson.image.publicId,
        req.file as ExpressFile,
      );

      // update person image in database
      const person = await this.staffService.editPerson(editedPerson._id, {
        image,
      });

      res.status(200).json(person);
    } catch (error) {
      next(error);
    }
  };

  deletePerson: Middleware = async (req: Request<any>, res, next) => {
    try {
      const _id = req.params._id as ObjectId;
      // delete person from database
      const deletePerson = await this.staffService.deletePerson(_id);

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

  getStaff: Middleware = async (req, res, next) => {
    try {
      const staff = await this.staffService.getStaff();
      res.status(200).json(staff);
    } catch (error) {
      next(error);
    }
  };

  getStaffByRole: Middleware = async (req: Request<any>, res, next) => {
    try {
      const roleId = req.params.roleId as ObjectId;
      const staff = await this.staffService.getStaffByRole(roleId);
      res.status(200).json(staff);
    } catch (error) {
      next(error);
    }
  };
}
