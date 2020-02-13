import GET_PROFILE from '@/graphql/queries/userProfile'

export function handleUnauthorized(req, res) {
  res.statusCode = 401
  res.send('Unauthorized')
}

/**
 * Sets logged in user to `req.user` and handles authorization.
 *
 * @param {function} authorizeFn          Function which returns true for an authorized user
 * @param {function} handleUnauthorizedFn Express middleware to handle unauthorized requests
 */
export default (
  authorizeFn = () => true,
  handleUnauthorizedFn = handleUnauthorized
) =>
  async function authMiddleware(req, res, next) {
    if (req.jwt && !req.user) {
      // eslint-disable-next-line require-atomic-updates
      req.user = await req.apolloClient
        .query({query: GET_PROFILE})
        .then(({data}) => data.userProfile)
        .catch(() => ({}))
    }
    if (authorizeFn(req.user)) next()
    else handleUnauthorizedFn(req, res, next)
  }
