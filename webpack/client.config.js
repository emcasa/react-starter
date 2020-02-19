const path = require('path')
const ManifestPlugin = require('webpack-manifest-plugin')
const LoadablePlugin = require('@loadable/webpack-plugin')
const {InjectManifest} = require('workbox-webpack-plugin')
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
      new InjectManifest({
        swSrc: './src/sw/index.js',
        swDest: 'sw.js',
        maximumFileSizeToCacheInBytes: 5e6
      }),
      new ManifestPlugin({fileName: 'asset-manifest.json'})
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
      SERVICE_WORKER: null,
      NODE_ENV: 'development',
      API_URL: null,
      APOLLO_ENGINE_URL: null
    })
  ])
