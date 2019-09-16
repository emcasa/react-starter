import {StaticRouter} from 'react-router-dom'
import renderDocument from '@/pages/document/render'
import createStore from '@/redux/store'
import Context from '@/pages/context'
import Routes from '@/pages/routes'

export default function clientRoute(req, res, next) {
  const context = {}
  const {apolloClient} = req
  const store = createStore({apolloClient})
  const element = (
    <StaticRouter context={context} location={req.url}>
      <Context store={store} apolloClient={apolloClient}>
        <Routes />
      </Context>
    </StaticRouter>
  )
  try {
    const html = renderDocument(element, store)
    if (context.url) return res.redirect(context.url)
    res.status(200).send(html)
  } catch (error) {
    return next(error)
  }
}
