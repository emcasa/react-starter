module.exports = {
  projects: [
    require('./test/browser.config.json'),
    require('./test/node.config.json')
  ],
  moduleFileExtensions: ['jsx', 'js', 'json'],
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  transform: {
    '^.+\\.(js|jsx|mjs)$': require.resolve('babel-jest'),
    '^.+\\.css$': require.resolve('razzle/config/jest/cssTransform'),
    '^(?!.*\\.(js|jsx|mjs|css|json)$)': require.resolve(
      'razzle/config/jest/fileTransform'
    )
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$']
}
