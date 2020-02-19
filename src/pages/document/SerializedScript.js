import PropTypes from 'prop-types'

/**
 * Serializes data to inject into a script
 * @param {*} data
 */
export const serialize = (data) => JSON.stringify(data).replace(/</g, '\\u003c')

/**
 * Serializes a function to dangerously inject into a script tag. The function
 * is called with `...args` on the client-side asap.
 * @param {Function} fn
 * @param  {...any} args
 */
export const serializeFn = (fn, ...args) => `
  (${fn.toString()}).apply(null, ${serialize(args)});
`

export default function SerializedScript({fn, args}) {
  return <script dangerouslySetInnerHTML={{__html: serializeFn(fn, ...args)}} />
}

SerializedScript.defaultProps = {
  args: []
}

SerializedScript.propTypes = {
  fn: PropTypes.function.isRequired,
  args: PropTypes.array.isRequired
}
