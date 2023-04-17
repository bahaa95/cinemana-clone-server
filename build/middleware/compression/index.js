"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compression = void 0;
var compression_1 = __importDefault(require("compression"));
function compression(options) {
    return (0, compression_1.default)(options);
}
exports.compression = compression;
