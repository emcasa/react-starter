import cookie from 'cookie'
import initApollo from '@/graphql/client'

/**
 * Initializes apollo client with jtw from cookies.
 */
export default () =>
  function apolloClientMiddleware(req, res, next) {
    req.jwt = cookie.parse(req.headers.cookie || '').token
    req.apolloClient = initApollo({
      getToken: () => req.jwt
    })
    return next()
  }
