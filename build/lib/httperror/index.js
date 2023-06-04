"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statuses = exports.HttpError = void 0;
var ts_httperror_1 = require("ts-httperror");
Object.defineProperty(exports, "statuses", { enumerable: true, get: function () { return ts_httperror_1.statuses; } });
var HttpError = (0, ts_httperror_1.createHttpError)();
exports.HttpError = HttpError;
