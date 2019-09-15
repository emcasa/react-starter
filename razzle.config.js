const path = require('path')
const clientPlugin = require('./webpack/client.config')
const serverPlugin = require('./webpack/server.config')

const target = (target, plugin) => (config, env) =>
  env.target == target ? plugin(config, env) : config

module.exports = {
  plugins: [
    /** Change paths to entry scripts */
    target('node', (config) => ({
      ...config,
      entry: config.entry
        .slice(0, -1)
        .concat(path.join(__dirname, 'src/server/index.js'))
    })),
    target('web', (config) => ({
      ...config,
      entry: {
        client: config.entry.client
          .slice(0, -1)
          .concat(path.join(__dirname, 'src/client/index.js'))
      }
    })),
    /** Bundle configs */
    target('node', serverPlugin),
    target('web', clientPlugin)
  ]
}
