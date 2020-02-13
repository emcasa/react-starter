import loadable from '@loadable/component'

export default loadable(() =>
  import(
    /* webpackChunkName: "pages/home" */
    './index'
  )
)
