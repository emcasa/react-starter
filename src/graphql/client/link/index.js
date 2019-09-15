import * as ApolloLink from 'apollo-link'
import {getMainDefinition} from 'apollo-utilities'
import contextLink from './contextLink'
import errorLink from './errorLink'
import httpLink from './httpLink'
import wsLink from './wsLink'

const isSubscription = ({query}) => {
  const {kind, operation} = getMainDefinition(query)
  return kind === 'OperationDefinition' && operation === 'subscription'
}

const requestLink = (options) =>
  process.browser
    ? ApolloLink.split(isSubscription, wsLink(options), httpLink(options))
    : httpLink(options)

export default function createApolloLink(options) {
  const links = []

  links.push(contextLink(options), errorLink(options))
  if (process.env.NODE_ENV === 'development' && process.browser)
    links.push(require('apollo-link-logger').default)
  // Terminating link
  links.push(requestLink(options))

  return ApolloLink.from(links)
}
