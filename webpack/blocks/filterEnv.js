const pickBy = require('lodash/pickBy')

/**
 * Filters variables from Webpack's DefinePlugin.
 *
 * @param {Function} filter
 */
module.exports = (filter) => ({webpack}) => (config) => ({
  plugins: config.plugins.map((plugin) => {
    if (plugin.constructor.name !== 'DefinePlugin') return plugin
    return new webpack.DefinePlugin(pickBy(plugin.definitions, filter))
  }),
  ...config
})
