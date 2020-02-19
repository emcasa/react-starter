import {Fragment} from 'react'

/**
 * Renders a non-blocking stylesheet link
 */
export default function DeferredStylesheet(props) {
  return (
    <Fragment>
      <link {...props} data-deferred-style rel="preload" as="style" />
      <noscript>
        <link {...props} />
      </noscript>
    </Fragment>
  )
}

DeferredStylesheet.load = function loadStyles() {
  document.querySelectorAll('link[data-deferred-style]').forEach(function(el) {
    el.onload = function() {
      this.onload = null
      this.rel = 'stylesheet'
    }
  })
}
