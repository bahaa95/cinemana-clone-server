"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var defaultOptions = {
    firstMatch: true,
};
/**
 * Replace elements from `array` that `predicate` returns truthy for
 * and returns an array with replacement elements. The predicate is invoked
 * with three arguments: (value, index, array).
 *
 * **Note:** This function does not mutate the array
 * @public
 * @category Array
 * @param {Array} array The array to replace elements that `predicate` returns truthy for.
 * @param {Any} replacement The replacement elements.
 * @param {Function} predicate The function invoked per iteration.
 * @param {Object} options The function options.
 * @param {Object} options
 * @returns {Array} Returns the new array with replacement elements.
 *
 * example1/
 * const array = [1, 2, 3, 4]
 * const newArray = replace(array, 0, n => n > 2)
 *
 * console.log(array)
 * // => [1, 2, 3, 4]
 *
 * console.log(newArray)
 * // => [1, 2, 0, 4]
 *
 * example1/
 * const array = [1, 2, 3, 4]
 * const newArray = replace(array, 0, n => n > 2,{firstMatch:false // default true})
 *
 * console.log(array)
 * // => [1, 2, 3, 4]
 *
 * console.log(newArray)
 * // => [1, 2, 0, 0]
 */
function replace(array, replacement, cb, options) {
    if (options === void 0) { options = defaultOptions; }
    var firstMatch = options.firstMatch;
    var result = [];
    var arrayCopy = __spreadArray([], array, true);
    if (!array || !array.length) {
        return result;
    }
    for (var i = 0; i < arrayCopy.length; i++) {
        if (cb(arrayCopy[i], i, arrayCopy)) {
            result.push(replacement);
            if (firstMatch) {
                result = result.concat(arrayCopy.slice(result.length));
                break;
            }
        }
        else {
            result.push(arrayCopy[i]);
        }
    }
    return result;
}
exports.default = replace;
