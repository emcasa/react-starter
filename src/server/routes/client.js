import {createMemoryHistory} from 'history'
import {StaticRouter} from 'react-router-dom'
import {renderToString} from 'react-dom/server'
import createStore from '@/redux/store'
import App from '@/client/App'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

export default (req, res) => {
  const {apolloClient} = req
  const history = createMemoryHistory()
  const store = createStore({history, apolloClient})
  const context = {}

  const markup = renderToString(
    <StaticRouter context={context} location={req.url}>
      <App apolloClient={apolloClient} store={store} />
    </StaticRouter>
  )

  if (context.url) return res.redirect(context.url)

  res.status(200).send(
    `
<!doctype html>
<html lang="pt-br">
  <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charset="utf-8" />
      <title>Welcome to Razzle</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ${
        assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ''
      }
      ${
        process.env.NODE_ENV === 'production'
          ? `<script src="${assets.client.js}" defer></script>`
          : `<script src="${assets.client.js}" defer crossorigin></script>`
      }
  </head>
  <body>
      <div id="root">${markup}</div>
  </body>
</html>`
  )
}
