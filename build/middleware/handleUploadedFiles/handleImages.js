"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleImages = void 0;
var multer_1 = require("./multer");
var httperror_1 = require("@/lib/httperror");
function handleImages(fields) {
    return function (req, res, next) {
        var upload = (0, multer_1.multer)({
            allowedExt: ['.jpg', '.jpeg', '.png'],
        }).fields(fields);
        upload(req, res, function (err) {
            if (err) {
                next(new httperror_1.HttpError({ status: httperror_1.statuses.Bad_Request, message: err.message }));
            }
            next();
        });
    };
}
exports.handleImages = handleImages;
