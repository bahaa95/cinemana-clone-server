"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateFiles = void 0;
var httperror_1 = require("@/lib/httperror");
function ValidateFiles() {
    var fields = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fields[_i] = arguments[_i];
    }
    return function (req, res, next) {
        try {
            if (!req.files) {
                throw new httperror_1.HttpError({
                    status: httperror_1.statuses.Bad_Request,
                    message: 'There is no file exists. please upload all required files',
                });
            }
            /* tslint:disable-next-line */
            for (var i = 0; i < fields.length; i += 1) {
                // @ts-ignore
                if (!req.files[fields[i]] || !req.files[fields[i]].length > 0) {
                    throw new httperror_1.HttpError({
                        status: httperror_1.statuses.Bad_Request,
                        message: "File ".concat(fields[i], " not exists. pleas select one"),
                    });
                }
            }
            next();
        }
        catch (err) {
            next(err);
        }
    };
}
exports.ValidateFiles = ValidateFiles;
