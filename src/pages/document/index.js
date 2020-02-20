import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import {SERVICE_WORKER, API_URL} from '@/config'
import SerializedScript from './SerializedScript'
import DeferredStylesheet from './DeferredStylesheet'
import registerSW from './helpers/registerSW'

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
        <meta name="theme-color" content="#ff2b7f" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}
        {chunks.links}
        {chunks.scripts}
        {chunks.styles}
        {styles}
        <link crossOrigin="true" rel="preconnect" href={API_URL} />
        <link
          crossOrigin="true"
          rel="preconnect"
          href="https://fonts.gstatic.com"
        />
        <DeferredStylesheet href="https://fonts.googleapis.com/css?family=Rubik&display=swap" />
        <SerializedScript fn={initState} args={[state]} />
        <SerializedScript fn={registerSW} args={[SERVICE_WORKER]} />
        <SerializedScript fn={DeferredStylesheet.load} />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{__html: children}} />
      </body>
    </html>
  )
}

function initState(data) {
  window.__initialState = data
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
