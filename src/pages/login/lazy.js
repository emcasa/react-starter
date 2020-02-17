import loadable from '@loadable/component'
import LoadingPage from '../loading'

export default loadable(
  () =>
    import(
      /* webpackChunkName: "pages/login" */
      './index'
    ),
  {fallback: <LoadingPage />}
)
