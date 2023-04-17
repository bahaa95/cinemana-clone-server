"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var httperror_1 = require("@/lib/httperror");
var logger_1 = require("@/lib/logger");
var isDevelopment_1 = require("@/utils/isDevelopment");
var isProduction_1 = require("@/utils/isProduction");
// eslint-disable-next-line import/prefer-default-export
function errorHandler(err, req, res, next) {
    // check if the error is HttpError
    if (httperror_1.HttpError.isValid(err)) {
        var error = err;
        (0, isDevelopment_1.isDevelopment)() === true && logger_1.logger.http(error.message, error);
        return res
            .status(error.status)
            .json((0, isProduction_1.isProduction)() ? error.toClient() : error);
    }
    // check if the error is ibvalid json error
    else if (err instanceof SyntaxError && 'body' in err) {
        return res.status(httperror_1.statuses.Bad_Request).json({ message: 'invalid json' });
    }
    else {
        logger_1.logger.error(err === null || err === void 0 ? void 0 : err.message, err);
        /* tslint:disable-next-line */
        process.exit(1);
    }
}
exports.errorHandler = errorHandler;
