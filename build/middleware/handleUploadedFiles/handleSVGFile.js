"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSVG = void 0;
var multer_1 = require("./multer");
var httperror_1 = require("@/lib/httperror");
function handleSVG(fieldname) {
    return function (req, res, next) {
        var upload = (0, multer_1.multer)({
            allowedExt: ['.svg'],
        }).single(fieldname);
        upload(req, res, function (err) {
            if (err) {
                next(new httperror_1.HttpError({ status: httperror_1.statuses.Bad_Request, message: err.message }));
            }
            next();
        });
    };
}
exports.handleSVG = handleSVG;
