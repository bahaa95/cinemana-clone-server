"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multer = void 0;
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
function multer(options) {
    var allowedExt = options.allowedExt, _a = options.fileSize, fileSize = _a === void 0 ? 1 * 1024 * 1024 : _a;
    return (0, multer_1.default)({
        storage: undefined,
        fileFilter: function (req, file, cb) {
            var ext = path_1.default.extname(file.originalname);
            if (allowedExt.includes(ext)) {
                return cb(null, true);
            }
            // @ts-ignore
            cb(new Error('File type is not supported.'), false);
        },
        limits: { fileSize: fileSize },
    });
}
exports.multer = multer;
