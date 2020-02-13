import {renderDocument} from '@/lib/ssr'
import {setHttpStatus} from '@/graphql/resolvers/Mutation'

export default async function errorHandler(error, req, res, _next) {
  console.error('Unexpected error', error)
  try {
    setHttpStatus(
      {},
      {code: 500, message: 'Internal server error'},
      req.apolloClient
    )
    res.status(500).send(await renderDocument(undefined, req))
  } catch (e) {
    console.error('Failed to render error page', e)
    res.status(500).send()
  }
}
