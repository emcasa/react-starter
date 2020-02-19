const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const LoadablePlugin = require('@loadable/webpack-plugin')
const {InjectManifest} = require('workbox-webpack-plugin')
const {
  createConfig,
  setEnv,
  addPlugins,
  defineConstants
} = require('webpack-blocks')
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
      // Include static files in assets manifest
      new CopyPlugin([
        {from: 'public', to: './', force: true, ignore: ['**/.*']}
      ]),
      // Build service worker bundle
      new InjectManifest({
        swSrc: './src/sw/index.js',
        swDest: 'sw.js',
        maximumFileSizeToCacheInBytes: 5e6
      }),
      // Generate public assets manifest
      new ManifestPlugin({fileName: 'asset-manifest.json'})
    ]),
    defineConstants({
      'self.__WB_REVISION': process.env.COMMIT_SHA1 || process.env.CIRCLE_SHA1
    }),
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
