"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preProcessArray = exports.preProcessBoolean = exports.preProcessDate = void 0;
var isArray_1 = require("@/utils/isArray");
var isBoolean_1 = require("@/utils/isBoolean");
var jsonParse_1 = require("@/utils/jsonParse");
var preProcessDate = function (arg) {
    if (typeof arg === 'string' || arg instanceof Date)
        return new Date(arg);
};
exports.preProcessDate = preProcessDate;
var preProcessBoolean = function (arg) {
    if ((0, isBoolean_1.isBoolean)(arg)) {
        return JSON.parse(arg);
    }
    return arg;
};
exports.preProcessBoolean = preProcessBoolean;
var preProcessArray = function (value) {
    return (0, isArray_1.isArray)(value) ? (0, jsonParse_1.jsonParse)(value) : value;
};
exports.preProcessArray = preProcessArray;
