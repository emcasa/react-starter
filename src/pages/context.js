import {Provider} from 'react-redux'
import {ApolloProvider} from 'react-apollo'
import {ThemeProvider} from 'styled-components'
import theme from '@/config/theme'

export default function ContextProvider({children, apolloClient, store}) {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ApolloProvider>
    </Provider>
  )
}
