import { Request } from 'express';
import { Middleware } from '@/types';
import { GroupController as IGroupController } from './types';
import { IGroupService } from '../service';
import { parseGroup } from '../utils/parseGroup';
import { AddGroupSchema, EditGroupSchema } from '../validation';
import { convertToObjectId } from '@/utils/convertToObjectId';
import { HttpError, statuses } from '@/lib/httperror';

export class GroupController implements IGroupController {
  private readonly groupService: IGroupService;

  constructor(_groupService: IGroupService) {
    this.groupService = _groupService;
  }

  public addGroup: Middleware = async (
    req: Request<{}, {}, AddGroupSchema['body']>,
    res,
    next,
  ) => {
    try {
      let data = parseGroup(req.body);

      // add group to database
      let newGroup = await this.groupService.addGroup(data);

      res.status(201).json(newGroup);
    } catch (error) {
      next(error);
    }
  };

  public editGroup: Middleware = async (
    req: Request<any, {}, EditGroupSchema['body']>,
    res,
    next,
  ) => {
    try {
      const _id = convertToObjectId(req.params._id);
      let data = parseGroup(req.body);

      // edit group in database
      let editedGroup = await this.groupService.editGroup(_id, data);

      // throw HttpError if group not found
      if (!editedGroup) {
        throw new HttpError({
          status: statuses.Not_Found,
          message: `Group with _id ${_id} not found.`,
          feature: 'groups',
        });
      }

      res.status(200).json(editedGroup);
    } catch (error) {
      next(error);
    }
  };

  public deleteGroup: Middleware = async (req: Request<any>, res, next) => {
    try {
      const _id = convertToObjectId(req.params._id);

      // delete group from database
      let deleteGroup = await this.groupService.deleteGroup(_id);

      // throw HttpError if group not found
      if (!deleteGroup) {
        throw new HttpError({
          status: statuses.Not_Found,
          message: `Group with _id ${_id} not found.`,
          feature: 'groups',
        });
      }

      res.status(200).json(deleteGroup);
    } catch (error) {
      next(error);
    }
  };

  public getGroups: Middleware = async (req, res, next) => {
    try {
      // get groups from database
      let groups = await this.groupService.getGroups();

      res.status(200).json(groups);
    } catch (error) {
      next(error);
    }
  };

  public getGroupWithVideos: Middleware = async (
    req: Request<any>,
    res,
    next,
  ) => {
    try {
      const _id = convertToObjectId(req.params._id);

      // get group from database
      let group = await this.groupService.getGroupWithVideos(_id);

      // throw HttpError if group not found
      if (!group) {
        throw new HttpError({
          status: statuses.Not_Found,
          message: `Group with _id ${_id} not found.`,
          feature: 'groups',
        });
      }

      res.status(200).json(group);
    } catch (error) {
      next(error);
    }
  };

  public getGroupsWithVideos: Middleware = async (req, res, next) => {
    try {
      // get all groups from the database
      let groups = await this.groupService.getGroupsWithVideos();

      res.status(200).json(groups);
    } catch (error) {
      next(error);
    }
  };
}
