/**
 * Removes all elements from `array` that `predicate` returns truthy for
 * and returns an array of the removed elements. The predicate is invoked
 * with three arguments: (value, index, array).
 *
 * **Note:** This function does not mutate the array
 * @public
 * @category Array
 * @param {Array} array The array to remove element from.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new array of removed elements.
 *
 * const array = [1, 2, 3, 4]
 * const newArray = remove(array, n => n > 2)
 *
 * console.log(array)
 * // => [1, 2, 3, 4]
 *
 * console.log(newArray)
 * // => [1, 2]
 */

function remove<T>(
  array: readonly T[],
  cb: (element: T, index: number, array: readonly T[]) => boolean
): T[] {
  const result: unknown[] = [];

  if (!array || !array.length) {
    return result as T[];
  }

  for (let i = 0; i < array.length; i++) {
    if (!cb(array[i], i, array)) {
      result.push(array[i]);
    }
  }

  return result as T[];
}

export default remove;
