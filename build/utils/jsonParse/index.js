"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonParse = void 0;
function jsonParse(data) {
    var parsedData = (typeof data === 'string' ? JSON.parse(data) : data);
    return parsedData;
}
exports.jsonParse = jsonParse;
