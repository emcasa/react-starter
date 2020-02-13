import path from 'path'
import flow from 'lodash/fp/flow'
import ReactDOM from 'react-dom/server'
import {getDataFromTree} from '@apollo/react-ssr'
import {ChunkExtractor} from '@loadable/server'
import {ServerStyleSheet} from 'styled-components'
import {isGraphQLResponseError, emitGraphQLErrors} from '@/lib/httpStatus'
import Document from '@/pages/document'

const statsFile = path.resolve(
  path.dirname(process.env.RAZZLE_ASSETS_MANIFEST),
  'loadable-stats.json'
)

const shouldEmitGraphQLError = ({code}) => Math.floor(code / 100) == 5

const emitServerErrors = emitGraphQLErrors(shouldEmitGraphQLError)

/**
 * Renders a react element to string
 * @param {React.ReactElement} element React element to render
 * @param {Object} ctx
 * @param {*} ctx.store                Redux store
 * @param {*} ctx.apolloClient         Apollo client
 */
export async function renderDocument(element, {store, apolloClient} = {}) {
  let markup,
    styles,
    chunks = {}
  if (element) {
    const styleSheet = new ServerStyleSheet()
    const chunkExtractor = new ChunkExtractor({
      statsFile,
      entrypoints: ['client']
    })
    const prep = flow([
      styleSheet.collectStyles.bind(styleSheet),
      chunkExtractor.collectChunks.bind(chunkExtractor)
    ])
    try {
      await getDataFromTree(element).catch((error) => {
        if (!isGraphQLResponseError(error)) throw error
        else emitServerErrors(error)
      })
      await store.close()
      markup = ReactDOM.renderToString(prep(element))
      styles = styleSheet.getStyleElement()
      chunks = {
        styles: chunkExtractor.getStyleElements(),
        scripts: chunkExtractor.getScriptElements(),
        links: chunkExtractor.getLinkElements()
      }
    } finally {
      styleSheet.seal()
    }
  }
  const state = {
    redux: store ? store.getState() : undefined,
    apollo: apolloClient ? apolloClient.extract() : undefined
  }
  const html = ReactDOM.renderToStaticMarkup(
    <Document state={state} chunks={chunks} styles={styles}>
      {markup}
    </Document>
  )
  return `<!doctype html>\n${html}`
}
