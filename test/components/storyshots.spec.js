import initStoryshots, {
  multiSnapshotWithOptions,
  Stories2SnapsConverter
} from '@storybook/addon-storyshots'

initStoryshots({
  framework: 'react',
  integrityOptions: {cwd: __dirname},
  test: multiSnapshotWithOptions(),
  stories2snapsConverter: new Stories2SnapsConverter({
    snapshotExtension: '.snap'
  })
})
