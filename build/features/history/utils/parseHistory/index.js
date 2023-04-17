"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseHistory = void 0;
var isBoolean_1 = require("@/utils/isBoolean");
var jsonParse_1 = require("@/utils/jsonParse");
function parseHistory(history) {
    var favorite = history.favorite, watchList = history.watchList;
    var parsedHistory = {};
    if ((0, isBoolean_1.isBoolean)(favorite)) {
        parsedHistory.favorite = (0, jsonParse_1.jsonParse)(favorite);
    }
    if ((0, isBoolean_1.isBoolean)(watchList)) {
        parsedHistory.watchList = (0, jsonParse_1.jsonParse)(watchList);
    }
    return parsedHistory;
}
exports.parseHistory = parseHistory;
