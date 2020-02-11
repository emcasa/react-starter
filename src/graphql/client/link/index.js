import * as ApolloLink from 'apollo-link'
import contextLink from './contextLink'
import errorLink from './errorLink'
import httpLink from './httpLink'

export default function createApolloLink(options) {
  const links = []

  links.push(contextLink(options), errorLink(options))
  if (process.env.NODE_ENV === 'development' && process.browser)
    links.push(require('apollo-link-logger').default)
  // Terminating link
  links.push(httpLink(options))

  return ApolloLink.from(links)
}
