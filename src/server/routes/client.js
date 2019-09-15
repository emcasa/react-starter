import {StaticRouter} from 'react-router-dom'
import {renderToString} from 'react-dom/server'
import createStore from '@/redux/store'
import Context from '@/pages/context'
import Routes from '@/pages/routes'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const renderPage = (markup, state) => `
<!doctype html>
<html lang="pt-br">
  <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charset="utf-8" />
      <title>Welcome to Razzle</title>
      <link href="https://fonts.googleapis.com/css?family=Rubik&display=swap" rel="stylesheet">
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
      <script>
        window.__initialState = ${JSON.stringify(state).replace(
          /</g,
          '\\u003c'
        )}
      </script>
  </head>
  <body>
      <div id="root">${markup}</div>
  </body>
</html>
`

export default (req, res) => {
  const {apolloClient} = req
  const store = createStore({apolloClient})
  const context = {}

  const markup = renderToString(
    <StaticRouter context={context} location={req.url}>
      <Context store={store} apolloClient={apolloClient}>
        <Routes />
      </Context>
    </StaticRouter>
  )

  if (context.url) return res.redirect(context.url)

  res.status(200).send(renderPage(markup, store.getState()))
}
