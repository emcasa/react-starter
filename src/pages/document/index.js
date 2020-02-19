import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

const serialize = (data) => JSON.stringify(data).replace(/</g, '\\u003c')

/**
 * Renders document markup on the server-side.
 */
export default function Document({children, styles, chunks, state}) {
  const head = Helmet.rewind()
  const html = head.htmlAttributes.toComponent()
  return (
    <html lang="pt" {...html}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}
        {chunks.links}
        {chunks.scripts}
        <link
          href="https://fonts.googleapis.com/css?family=Rubik&display=swap"
          rel="stylesheet"
        />
        {chunks.styles}
        {styles}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__initialState = ${serialize(state)}`
          }}
        />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{__html: children}} />
      </body>
    </html>
  )
}

Document.propTypes = {
  /** Content html */
  children: PropTypes.string,
  /** Style element extracted from styled-components' ServerStyleSheet */
  styles: PropTypes.node,
  /** Elements extracted from @loadable/server's ChunkExtractor */
  chunks: PropTypes.shape({
    styles: PropTypes.node,
    scripts: PropTypes.node,
    links: PropTypes.node
  }),
  /** Redux store preloaded state */
  state: PropTypes.object
}
