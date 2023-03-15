import { IHistory } from '../../model';

export function createId(
  userId: IHistory['userId'],
  videoId: IHistory['videoId'],
): string {
  return `${userId}-${videoId}`;
}
