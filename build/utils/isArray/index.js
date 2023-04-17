"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArray = void 0;
function isArray(arg) {
    try {
        var value = typeof arg === 'string' ? JSON.parse(arg) : arg;
        if (Array.isArray(value))
            return true;
        return false;
    }
    catch (error) {
        return false;
    }
}
exports.isArray = isArray;
