"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToDataUri = void 0;
var path_1 = __importDefault(require("path"));
var parser_1 = __importDefault(require("datauri/parser"));
var parser = new parser_1.default();
function convertToDataUri(file) {
    if (!file) {
        throw new Error('Convert to data URI failed because file is undefined.');
    }
    var uri = parser.format(path_1.default.extname(file.originalname).toString(), file.buffer);
    // throw HttpError if base64 or mimetype property is undefined
    if (!uri.base64 || !uri.mimetype) {
        throw new Error('Something went wrong while converting file to data URI.');
    }
    return "data:".concat(uri.mimetype, ";base64,").concat(uri.base64);
}
exports.convertToDataUri = convertToDataUri;
