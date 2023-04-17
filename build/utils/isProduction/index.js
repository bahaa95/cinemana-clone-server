"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProduction = void 0;
var config_1 = require("@/config");
function isProduction() {
    return config_1.NODE_ENV === 'production';
}
exports.isProduction = isProduction;
