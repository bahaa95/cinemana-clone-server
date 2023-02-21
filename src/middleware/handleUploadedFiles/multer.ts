import multerPkg from 'multer';
import path from 'path';

type Options = {
  allowedExt: string[];
  fileSize?: number;
};

export function multer(options: Options) {
  const { allowedExt, fileSize = 1 * 1024 * 1024 } = options;

  return multerPkg({
    storage: undefined,
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname);

      if (allowedExt.includes(ext)) {
        return cb(null, true);
      }
      // @ts-ignore
      cb(new Error('File type is not supported.'), false);
    },
    limits: { fileSize, fields: 10, files: 1 },
  });
}
