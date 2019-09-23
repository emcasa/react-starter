import {addDecorator, configure} from '@storybook/react'
import StoryContainer from './StoryContainer'

// automatically import all files ending in *.stories.js
configure(require.context('../test/components', true, /\.stories\.js$/), module)

addDecorator((story) => <StoryContainer>{story()}</StoryContainer>)
