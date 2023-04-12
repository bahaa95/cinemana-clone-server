import { GroupDocument, GroupModel } from '../model';
import { GroupService as IGroupService } from './types';
import { lookupMainCategory, projectVideoListItem } from '@/features/videos';

export class GroupService implements IGroupService {
  private readonly Group: GroupModel;

  constructor(_GroupModel: GroupModel) {
    this.Group = _GroupModel;
  }

  /**
   * @access public dashboard
   */
  public addGroup: IGroupService['addGroup'] = async (group) => {
    let newGroup = await new this.Group(group).save();
    return newGroup;
  };

  /**
   * @access public dashboard
   */
  public deleteGroup: IGroupService['deleteGroup'] = async (_id) => {
    let deletedGroup = await this.Group.findOneAndDelete(
      { _id },
      { select: { videos: 0, __v: 0 } },
    );

    if (!deletedGroup) return null;

    return deletedGroup;
  };

  /**
   * @access public dashboard
   */
  public editGroup: IGroupService['editGroup'] = async (_id, group) => {
    let editedGroup = await this.Group.findOneAndUpdate(
      { _id },
      {
        $set: group,
      },
      {
        new: true,
        select: { videos: 0, __v: 0 },
      },
    );

    if (!editedGroup) return null;

    return editedGroup;
  };

  /**
   * @access public dashboard
   */
  public getGroups: IGroupService['getGroups'] = async () => {
    let groups = await this.Group.aggregate([
      { $match: {} },
      { $project: { __v: 0, videos: 0 } },
    ]);

    return groups;
  };

  /**
   * @access public dashboard, cinmana client
   */
  public getGroupWithVideos: IGroupService['getGroupWithVideos'] = async (
    _id,
  ) => {
    let [group] = await this.Group.aggregate<GroupDocument>([
      { $match: { _id } },
      { $project: { __v: 0 } },
      {
        $lookup: {
          from: 'videos',
          foreignField: '_id',
          localField: 'videos',
          as: 'videos',
          pipeline: [
            { $project: projectVideoListItem },
            { $lookup: lookupMainCategory },
            { $unwind: '$mainCategory' },
            { $sort: { releaseDate: -1 } },
          ],
        },
      },
    ]);

    if (!group) return null;

    return group;
  };

  /**
   * @access public dashboard, cinmana client
   */
  public getGroupsWithVideos: IGroupService['getGroupsWithVideos'] =
    async () => {
      let groups = await this.Group.aggregate<GroupDocument>([
        { $match: {} },
        { $project: { __v: 0 } },
        {
          $lookup: {
            from: 'videos',
            foreignField: '_id',
            localField: 'videos',
            as: 'videos',
            pipeline: [
              { $project: projectVideoListItem },
              { $lookup: lookupMainCategory },
              { $unwind: '$mainCategory' },
              { $sort: { releaseDate: -1 } },
            ],
          },
        },
      ]);

      return groups;
    };
}
