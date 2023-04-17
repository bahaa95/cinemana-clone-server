"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDevelopment = void 0;
var index_1 = require("@/config/index");
function isDevelopment() {
    return index_1.NODE_ENV === 'development';
}
exports.isDevelopment = isDevelopment;
