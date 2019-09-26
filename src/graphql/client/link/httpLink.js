import {createHttpLink} from 'apollo-link-http'
import fetch from 'cross-fetch'
import {APOLLO_ENGINE_URL} from '@/config'

export default () =>
  createHttpLink({
    fetch,
    uri: APOLLO_ENGINE_URL,
    credentials: 'same-origin'
  })
