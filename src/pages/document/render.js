import ReactDOM from 'react-dom/server'
import {getDataFromTree} from '@apollo/react-ssr'
import {ServerStyleSheet} from 'styled-components'
import {isGraphQLResponseError, emitGraphQLErrors} from '@/lib/httpStatus'
import Document from './index'

/**
 * Renders a react element to string
 * @param {React.ReactElement} element React element to render
 * @param {Object} ctx
 * @param {*} ctx.store                Redux store
 * @param {*} ctx.apolloClient         Apollo client
 */
export default async function renderDocument(
  element,
  {store, apolloClient} = {}
) {
  let styles, markup
  if (element) {
    const styleSheet = new ServerStyleSheet()
    try {
      await getDataFromTree(element).catch((error) => {
        if (!isGraphQLResponseError(error)) throw error
        else emitGraphQLErrors(error)
      })
      await store.close()
      markup = ReactDOM.renderToString(styleSheet.collectStyles(element))
      styles = styleSheet.getStyleElement()
    } finally {
      styleSheet.seal()
    }
  }
  const state = {
    redux: store ? store.getState() : undefined,
    apollo: apolloClient ? apolloClient.extract() : undefined
  }
  const html = ReactDOM.renderToStaticMarkup(
    <Document state={state} styles={styles}>
      {markup}
    </Document>
  )
  return `<!doctype html>\n${html}`
}
