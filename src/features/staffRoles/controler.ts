import { Request } from 'express';
import { Middleware, ObjectId } from '@/types';
import {
  StaffRoleController as IStaffRoleController,
  StaffRoleService,
  AddRoleSchema,
  EditRoleSchema,
} from './types';
import { HttpError, statuses } from '@/lib/httperror';

export class StaffRoleController implements IStaffRoleController {
  private readonly service: StaffRoleService;

  constructor(_service: StaffRoleService) {
    this.service = _service;
  }

  addRole: Middleware = async (
    req: Request<{}, {}, AddRoleSchema['body']>,
    res,
    next,
  ) => {
    try {
      const data = req.body;
      const newRole = await this.service.addRole(data);
      res.status(201).json(newRole);
    } catch (error) {
      next(error);
    }
  };

  editRole: Middleware = async (
    req: Request<any, {}, EditRoleSchema['body']>,
    res,
    next,
  ) => {
    try {
      const _id = req.params._id as ObjectId;
      const data = req.body;
      const editedRole = await this.service.editRole(_id, data);

      if (!editedRole) {
        throw new HttpError({
          status: statuses.Not_Found,
          message: 'Role not found',
          feature: 'staffRoles',
        });
      }

      res.status(200).json(editedRole);
    } catch (error) {
      next(error);
    }
  };

  deleteRole: Middleware = async (req: Request<any>, res, next) => {
    try {
      const _id = req.params._id as ObjectId;
      const deletedRole = await this.service.deleteRole(_id);

      if (!deletedRole) {
        throw new HttpError({
          status: statuses.Not_Found,
          message: 'Role not found',
          feature: 'staffRoles',
        });
      }

      res.status(200).json(deletedRole);
    } catch (error) {
      next(error);
    }
  };

  getRoles: Middleware = async (req, res, next) => {
    try {
      const roles = await this.service.getRoles();
      res.status(200).json(roles);
    } catch (error) {
      next(error);
    }
  };

  isAlreadyExist: Middleware = async (
    req: Request<any, {}, EditRoleSchema['body']>,
    res,
    next,
  ) => {
    try {
      const _id = req.params._id as ObjectId;
      const { title } = req.body;
      const isExist = await this.service.isExist({
        _id,
        title,
      });

      // throw error if exist
      if (isExist) {
        next(
          new HttpError({
            status: statuses.Conflict,
            message: 'Role already exists.',
            feature: 'staffRoles',
          }),
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
