"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBoolean = void 0;
function isBoolean(value) {
    try {
        var booleanVlues = [true, false];
        var parsedValue = typeof value === 'string' ? JSON.parse(value) : value;
        return booleanVlues.includes(parsedValue);
    }
    catch (error) {
        return false;
    }
}
exports.isBoolean = isBoolean;
