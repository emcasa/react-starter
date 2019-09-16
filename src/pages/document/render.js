import ReactDOM from 'react-dom/server'
import {renderToStringWithData} from '@apollo/react-ssr'
import {ServerStyleSheet} from 'styled-components'
import Document from './index'

/**
 * Renders a react element to string
 * @param element      React element to render
 * @param store        Redux store
 * @param apolloClient Apollo client
 */
export default async function renderDocument(element, store, apolloClient) {
  let markup
  const styleSheet = new ServerStyleSheet()
  try {
    markup = await renderToStringWithData(styleSheet.collectStyles(element))
  } finally {
    styleSheet.seal()
  }
  const html = ReactDOM.renderToStaticMarkup(
    <Document
      state={{
        redux: store.getState(),
        apollo: apolloClient.extract()
      }}
      styles={styleSheet.getStyleElement()}
    >
      {markup}
    </Document>
  )
  return `<!doctype html>\n${html}`
}
