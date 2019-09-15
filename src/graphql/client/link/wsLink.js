import {ApolloLink, Observable} from 'apollo-link'
import {WS_URL} from '@/config'

export class WebSocketLink extends ApolloLink {
  token = null

  constructor(url) {
    super()
    this.url = url
  }

  updateLink(token) {
    const {createAbsintheSocketLink} = require('@absinthe/socket-apollo-link')
    const AbsintheSocket = require('@absinthe/socket')
    const {Socket} = require('phoenix')
    this.token = token
    this.link = createAbsintheSocketLink(
      AbsintheSocket.create(
        new Socket(this.url, {params: {Authorization: this.token}})
      )
    )
  }

  request(operation, forward) {
    const token = operation.getContext().headers.authorization
    if (!process.browser) return Observable.of()
    if (!this.link || token !== this.token) this.updateLink(token)
    return this.link.request(operation, forward)
  }
}

export default () => new WebSocketLink(WS_URL)
