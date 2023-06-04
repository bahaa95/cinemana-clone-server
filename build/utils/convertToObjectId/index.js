"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToObjectId = void 0;
var mongoose_1 = require("mongoose");
var httperror_1 = require("@/lib/httperror");
function convertToObjectId(_id) {
    try {
        if (typeof _id === 'string') {
            return new mongoose_1.Types.ObjectId(_id);
        }
        return _id;
    }
    catch (_a) {
        throw new httperror_1.HttpError({
            status: 400,
            message: 'Invalid _id',
            details: 'convertToObjectId function',
        });
    }
}
exports.convertToObjectId = convertToObjectId;
