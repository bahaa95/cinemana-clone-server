type Options = {
  firstMatch?: boolean;
};

const defaultOptions: Options = {
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
function replace<T>(
  array: readonly T[],
  replacement: T,
  cb: (element: T, index: number, array: T[]) => boolean,
  options = defaultOptions
) {
  const { firstMatch } = options;
  let result: any = [];
  const arrayCopy = [...array];

  if (!array || !array.length) {
    return result as T[];
  }

  for (let i = 0; i < arrayCopy.length; i++) {
    if (cb(arrayCopy[i], i, arrayCopy)) {
      result.push(replacement);

      if (firstMatch) {
        result = result.concat(arrayCopy.slice(result.length));
        break;
      }
    } else {
      result.push(arrayCopy[i]);
    }
  }

  return result as T[];
}

export default replace;
