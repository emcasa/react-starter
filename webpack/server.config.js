/**
 * Razzle plugin to modify the server bundle's webpack config
 */
module.exports = (config, env) => ({
  ...config,
  externals: env.dev ? config.externals : undefined,
  optimization: {
    minimize: false
  }
})
