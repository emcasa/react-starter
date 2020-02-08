// eslint-disable-next-line
const config = jest.requireActual('../index')
const originalConfig = {...config}
const mockableKeys = Object.keys(config)

module.exports = config

module.exports.mock = (env) => {
  Object.entries(env).forEach(([key, value]) => {
    config[key] = value
  })
  return config
}

module.exports.restore = (keys = mockableKeys) => {
  keys.forEach((key) => {
    config[key] = originalConfig[key]
  })
  return config
}
