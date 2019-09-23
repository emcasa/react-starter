import path from 'path'
import initStoryshots, {
  multiSnapshotWithOptions
} from '@storybook/addon-storyshots'

class Stories2SnapsConverter {
  getSnapshotFileName(context) {
    const {kind} = context
    return path.resolve('test/components/__snapshots__', kind) + '.snap'
  }
}

initStoryshots({
  test: multiSnapshotWithOptions(),
  stories2snapsConverter: new Stories2SnapsConverter()
})
