import {ThemeProvider} from 'styled-components'
import Helmet from 'react-helmet'
import Shell from '@/components/layout/Shell'
import theme from '@/config/theme'

export default function StoryContainer({children}) {
  return (
    <ThemeProvider theme={theme}>
      <Shell>
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css?family=Rubik&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        {children}
      </Shell>
    </ThemeProvider>
  )
}
