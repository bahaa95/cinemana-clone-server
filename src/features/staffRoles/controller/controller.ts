import { Request } from 'express';
import { Middleware } from '@/types';
import { StaffRoleController as IStaffRoleController } from './types';
import { HttpError, statuses } from '@/lib/httperror';
import { AddRoleSchema, EditRoleSchema } from '../validation';
import { IStaffRoleService } from '../service';
import { convertToObjectId } from '@/utils/convertToObjectId';

export class StaffRoleController implements IStaffRoleController {
  private readonly staffRoleService: IStaffRoleService;

  constructor(_service: IStaffRoleService) {
    this.staffRoleService = _service;
  }

  public addRole: Middleware = async (
    req: Request<{}, {}, AddRoleSchema['body']>,
    res,
    next,
  ) => {
    try {
      const { title } = req.body;

      // save role to database
      let newRole = await this.staffRoleService.addRole({ title });
      res.status(201).json(newRole);
    } catch (error) {
      next(error);
    }
  };

  public editRole: Middleware = async (
    req: Request<any, {}, EditRoleSchema['body']>,
    res,
    next,
  ) => {
    try {
      const _id = convertToObjectId(req.params._id);
      const { title } = req.body;

      // edit role
      let editedRole = await this.staffRoleService.editRole(_id, { title });

      // throw HttpError if role not found
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

  public deleteRole: Middleware = async (req: Request<any>, res, next) => {
    try {
      const _id = convertToObjectId(req.params._id);

      // delete role
      let deletedRole = await this.staffRoleService.deleteRole(_id);

      // throw HttpError if role not found
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

  public getRoles: Middleware = async (req, res, next) => {
    try {
      // get roles
      let roles = await this.staffRoleService.getRoles();
      res.status(200).json(roles);
    } catch (error) {
      next(error);
    }
  };
}
