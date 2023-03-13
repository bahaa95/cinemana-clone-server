import { Middleware } from '@/types';

export interface GroupController {
  addGroup: Middleware;
  editGroup: Middleware;
  deleteGroup: Middleware;
  getGroups: Middleware;
  getGroupWithVideos: Middleware;
  getGroupsWithVideos: Middleware;
}
