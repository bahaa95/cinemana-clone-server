"use strict";
/**
 * Check if `array` has element that `predicate` returns truthy for
 * and returns true if the element is exists otherwise returns false. The predicate is invoked
 * with three arguments: (value, index, array).
 *
 * @public
 * @category Array
 * @param {Array} array The array to search about element in it.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Boolean} Returns boolean.
 *
 * const array = [1, 2, 3, 4]
 * const result = has(array, n => n === 4)
 *
 * console.log(result)
 * // => true
 */
Object.defineProperty(exports, "__esModule", { value: true });
function has(array, cb) {
    var result = false;
    if (!array || !array.length) {
        return result;
    }
    for (var i = 0; i < array.length; i++) {
        if (cb(array[i], i, array)) {
            result = true;
            break;
        }
    }
    return result;
}
exports.default = has;
