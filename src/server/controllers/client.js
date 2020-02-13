import GET_HTTP_STATUS from '@/graphql/queries/httpStatus'
import renderDocument from '@/pages/document/render'
import SSRApp from '@/server/App'
import {SSR} from '@/config'

export default async function clientRoute(req, res, next) {
  const {apolloClient, history} = req
  if (!SSR) {
    res.status(200).send(await renderDocument())
    return
  }
  try {
    const html = await renderDocument(SSRApp(req), req)
    if (history.length > 1) return res.redirect(history.location.pathname)
    const {httpStatus} = await apolloClient.cache.readQuery({
      query: GET_HTTP_STATUS
    })
    res.status(httpStatus.code).send(html)
  } catch (error) {
    return next(error)
  }
}
