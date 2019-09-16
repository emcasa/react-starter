import ReactDOM from 'react-dom/server'
import {ServerStyleSheet} from 'styled-components'
import Document from './index'

export default function renderDocument(element, store) {
  let markup
  const styleSheet = new ServerStyleSheet()
  try {
    markup = ReactDOM.renderToString(styleSheet.collectStyles(element))
  } finally {
    styleSheet.seal()
  }
  const html = ReactDOM.renderToStaticMarkup(
    <Document state={store.getState()} styles={styleSheet.getStyleElement()}>
      {markup}
    </Document>
  )
  return `<!doctype html>\n${html}`
}
