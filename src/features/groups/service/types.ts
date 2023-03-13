import { ObjectId } from '@/types';
import { IGroup, GroupDocument } from '../model';

export interface GroupService {
  addGroup: (group: IGroup) => Promise<Omit<GroupDocument, 'videos'>>;

  deleteGroup: (
    _id: ObjectId,
  ) => Promise<Omit<GroupDocument, 'videos' | '__v'> | null>;

  editGroup: (
    _id: ObjectId,
    group: IGroup,
  ) => Promise<Omit<GroupDocument, 'videos' | '__v'> | null>;

  getGroups: () => Promise<Omit<GroupDocument, 'videos' | '__v'>[]>;

  getGroupWithVideos: (_id: ObjectId) => Promise<GroupDocument | null>;

  getGroupsWithVideos: () => Promise<GroupDocument[]>;
}
