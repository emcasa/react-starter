import {createHttpLink} from 'apollo-link-http'
import fetch from 'isomorphic-unfetch'
import {API_URL} from '@/config'

export default () =>
  createHttpLink({
    fetch,
    uri: API_URL,
    credentials: 'same-origin'
  })
