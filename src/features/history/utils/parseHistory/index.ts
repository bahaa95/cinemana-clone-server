import { isBoolean } from '@/utils/isBoolean';
import { jsonParse } from '@/utils/jsonParse';
import { EditHistorySchema } from '../../validation';
import { IHistory } from '../../model';

export function parseHistory(
  history: EditHistorySchema['body'],
): Partial<IHistory> {
  const { favorite, watchList } = history;
  let parsedHistory: Partial<IHistory> = {};

  if (isBoolean(favorite)) {
    parsedHistory.favorite = jsonParse(favorite);
  }

  if (isBoolean(watchList)) {
    parsedHistory.watchList = jsonParse(watchList);
  }

  return parsedHistory;
}
