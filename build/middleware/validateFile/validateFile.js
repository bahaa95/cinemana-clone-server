"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateFile = void 0;
var httperror_1 = require("@/lib/httperror");
function ValidateFile(message) {
    if (message === void 0) { message = 'There is no file exists please select one'; }
    return function (req, res, next) {
        if (!req.file) {
            next(new httperror_1.HttpError({
                status: httperror_1.statuses.Bad_Request,
                message: message,
            }));
        }
        next();
    };
}
exports.ValidateFile = ValidateFile;
