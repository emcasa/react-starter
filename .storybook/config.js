import {addDecorator, configure} from '@storybook/react'
import StoryContainer from './StoryContainer'
import requireContext from 'require-context.macro'

// automatically import all files ending in *.stories.js
configure(requireContext('../test/components', true, /\.stories\.js$/), module)

addDecorator((story) => <StoryContainer>{story()}</StoryContainer>)
