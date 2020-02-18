const path = require('path')
const LoadablePlugin = require('@loadable/webpack-plugin')
const {GenerateSW} = require('workbox-webpack-plugin')
const {createConfig, setEnv, addPlugins} = require('webpack-blocks')
const merge = require('./blocks/merge')

/**
 * Razzle plugin to modify the client bundle's webpack config
 */
module.exports = (config) =>
  createConfig([
    merge(config),
    /**
     * Service worker configuration
     */
    addPlugins([
      new GenerateSW({
        additionalManifestEntries: [
          {url: 'https://fonts.googleapis.com/css?family=Rubik&display=swap'}
        ],
        cleanupOutdatedCaches: true
      })
    ]),
    /**
     * Loadable components configuration
     */
    addPlugins([
      new LoadablePlugin({
        outputAsset: false,
        writeToDisk: {
          filename: path.resolve(__dirname, '../build')
        }
      })
    ]),
    merge({
      output: {
        chunkFilename: '[name].bundle.js'
      },
      optimization: {
        runtimeChunk: 'multiple',
        splitChunks: {chunks: 'all'}
      }
    }),
    /**
     * Env vars
     * Set default values for the output bundle's process.env here
     */
    setEnv({
      NODE_ENV: 'development',
      API_URL: null,
      APOLLO_ENGINE_URL: null
    })
  ])
