/**
 * @name CreateDescribeFn
 * @function
 * @param {Describe}  describeFn Some function with the same signature
 *                               as jest's describe
 * @returns {Function}           A block function that runs describeFn
 */

/**
 * Helper to create a jest block function like describe
 * that can send some input to the block.
 * @see ./express.js
 * @param {CreateDescribeFn}
 * @returns {Function}
 */
export const createDescribe = (createDescribe) =>
  Object.assign(createDescribe(describe), {
    only: createDescribe(describe.only),
    skip: createDescribe(describe.skip)
  })
