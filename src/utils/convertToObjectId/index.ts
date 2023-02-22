import { Types } from 'mongoose';
import { ObjectId } from '@/types';
import { HttpError } from '@/lib/httperror';

export function convertToObjectId(_id: string | ObjectId): ObjectId {
  try {
    if (typeof _id === 'string') {
      return new Types.ObjectId(_id);
    }
    return _id;
  } catch {
    throw new HttpError({
      status: 400,
      message: 'Invalid _id',
      details: 'convertToObjectId function',
    });
  }
}
