const path = require('path')

module.exports = {
  plugins: [
    /** Change paths to entry scripts */
    (config, env) => {
      if (env.target == 'node') {
        config.entry = config.entry
          .slice(0, -1)
          .concat(path.join(__dirname, 'src/server/index.js'))
      } else {
        config.entry.client = config.entry.client
          .slice(0, -1)
          .concat(path.join(__dirname, 'src/client/index.js'))
      }
      return config
    }
  ]
}
