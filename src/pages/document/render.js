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
  let state = {}
  let styles, markup
  if (element) {
    const styleSheet = new ServerStyleSheet()
    try {
      markup = await renderToStringWithData(styleSheet.collectStyles(element))
      styles = styleSheet.getStyleElement()
      state = {
        redux: store.getState(),
        apollo: apolloClient.extract()
      }
    } finally {
      styleSheet.seal()
    }
  }
  const html = ReactDOM.renderToStaticMarkup(
    <Document state={state} styles={styles}>
      {markup}
    </Document>
  )
  return `<!doctype html>\n${html}`
}
