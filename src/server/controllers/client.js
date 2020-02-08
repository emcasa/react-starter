import {StaticRouter} from 'react-router-dom'
import renderDocument from '@/pages/document/render'
import createStore from '@/redux/store'
import Context from '@/pages/context'
import Routes from '@/pages/routes'
import {SSR} from '@/config'

export default async function clientRoute(req, res, next) {
  const context = {}
  const {apolloClient} = req
  console.log('...', SSR)
  if (!SSR) {
    res.status(200).send(await renderDocument())
    return
  }
  const store = createStore({apolloClient})
  const element = (
    <StaticRouter context={context} location={req.url}>
      <Context store={store} apolloClient={apolloClient}>
        <Routes />
      </Context>
    </StaticRouter>
  )
  try {
    const html = await renderDocument(element, store, apolloClient)
    if (context.url) return res.redirect(context.url)
    res.status(200).send(html)
  } catch (error) {
    return next(error)
  }
}
