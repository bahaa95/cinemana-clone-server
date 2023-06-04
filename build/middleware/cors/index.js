"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cors = void 0;
var cors_1 = __importDefault(require("cors"));
var index_1 = require("@/config/index");
// eslint-disable-next-line
function cors() {
    return (0, cors_1.default)({
        credentials: true,
        origin: [index_1.CLIENT_ORIGIN, index_1.DASHBORAD_ORIGIN],
        optionsSuccessStatus: 200,
    });
}
exports.cors = cors;
