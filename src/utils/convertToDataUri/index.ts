import path from 'path';
import DatauriParser from 'datauri/parser';
import { Request } from 'express';

const parser = new DatauriParser();

export function convertToDataUri(file: NonNullable<Request['file']>):string {
  if (!file) {
    throw new Error('Convert to data URI failed because file is undefined.');
  }

  const uri = parser.format(
    path.extname(file!.originalname!).toString(),
    file!.buffer,
  );

  // throw HttpError if base64 or mimetype property is undefined
  if (!uri.base64 || !uri.mimetype) {
    throw new Error('Something went wrong while converting file to data URI.');
  }

  return `data:${uri.mimetype};base64,${uri.base64}`;
}
