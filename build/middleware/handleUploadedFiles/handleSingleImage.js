"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSingleImage = void 0;
var multer_1 = require("./multer");
var httperror_1 = require("@/lib/httperror");
function handleSingleImage(fieldname) {
    return function (req, res, next) {
        var upload = (0, multer_1.multer)({
            allowedExt: ['.jpg', '.jpeg', '.png'],
        }).single(fieldname);
        upload(req, res, function (err) {
            if (err) {
                next(new httperror_1.HttpError({ status: httperror_1.statuses.Bad_Request, message: err.message }));
            }
            next();
        });
    };
}
exports.handleSingleImage = handleSingleImage;
