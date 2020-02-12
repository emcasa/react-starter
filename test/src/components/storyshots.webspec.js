import initStoryshots, {
  multiSnapshotWithOptions
} from '@storybook/addon-storyshots'

initStoryshots({
  framework: 'react',
  integrityOptions: {cwd: __dirname},
  test: multiSnapshotWithOptions()
})
