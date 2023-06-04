"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResource = void 0;
var httperror_1 = require("@/lib/httperror");
var isDevelopment_1 = require("@/utils/isDevelopment");
function validateResource(schema) {
    return function (req, res, next) {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        }
        catch (e) {
            var error = new httperror_1.HttpError({
                status: httperror_1.statuses.Bad_Request,
                message: 'Validation failed.',
            });
            // add errors detailes to error in development environment
            if ((0, isDevelopment_1.isDevelopment)()) {
                error.details = e.errors;
            }
            next(error);
        }
    };
}
exports.validateResource = validateResource;
