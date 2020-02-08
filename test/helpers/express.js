import isFunction from 'lodash/isFunction'
import {createDescribe} from './createDescribe'

/**
 * Returns an instance of the project's express application configured
 * with the given env vars
 * @param {Object} env Object of environment variables to replace in `@/config`
 */
export function getExpressApp(env) {
  require('@/config')
    .restore()
    .mock(env)
  return require('@/server/server').default
}

/**
 * Block function that provides a pre-configured express application
 * @param {Object}          env  see `getExpressApp`
 * @param {String|Function} desc Description of the blo
 * @param {Function?}       fn   Function that takes an express app
 */
export const withExpress = createDescribe(
  (describeFn) =>
    function _withExpress(...args) {
      const [env, desc, fn] = withExpressArgs(args)
      describeFn(desc, () => {
        const app = require('@/server/server').default
        beforeAll(() => require('@/config').mock(env))
        afterAll(() => require('@/config').restore())
        fn(app)
      })
    }
)

const withExpressArgs = ([env, ...args]) => {
  let [desc, fn] = args
  if (isFunction(desc)) {
    fn = desc
    desc = JSON.stringify(env)
  }
  return [env, desc, fn]
}
