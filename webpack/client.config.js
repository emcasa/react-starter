const merge = require('./blocks/merge')
const {createConfig, setEnv} = require('webpack-blocks')

/**
 * Razzle plugin to modify the client bundle's webpack config
 */
module.exports = (config) =>
  createConfig([
    merge(config),
    /**
     * Env vars
     * Set default values for the output bundle's process.env here
     */
    setEnv({
      NODE_ENV: 'development',
      API_URL: null,
      WS_URL: null,
      APOLLO_ENGINE_URL: null,
      FACEBOOK_APP_ID: null,
      ACCOUNT_KIT_APP_SECRET: null
    })
  ])
