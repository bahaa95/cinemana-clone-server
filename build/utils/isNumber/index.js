"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = void 0;
/**
 * Returns a Boolean value that indicates whether a value is number.
 * @param value A numeric value.
 *
 * @example
 * ```ts
 * console.log(isNumber(1)) => true
 * console.log(isNumber('10')) => true
 * console.log(isNumber('not number')) => false
 * console.log(isNumber('g1')) => false
 * ```
 */
function isNumber(value) {
    return !Number.isNaN(value);
}
exports.isNumber = isNumber;
