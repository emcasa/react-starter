import path from 'path'

process.env.RAZZLE_ASSETS_MANIFEST = path.resolve(
  __dirname,
  '../fixtures/assets.json'
)
process.env.SSR = false
