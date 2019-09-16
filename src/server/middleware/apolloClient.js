import initApollo from '@/graphql/client'
import {getToken} from '@/components/auth/lib/jwt'

/**
 * Initializes apollo client with jtw from cookies.
 */
export default () =>
  function apolloClientMiddleware(req, res, next) {
    req.jwt = getToken(req)
    req.apolloClient = initApollo({
      getToken: () => req.jwt
    })
    return next()
  }
