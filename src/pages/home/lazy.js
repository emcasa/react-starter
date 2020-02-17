import loadable from '@loadable/component'
import LoadingPage from '../loading'

export default loadable(
  () =>
    import(
      /* webpackChunkName: "pages/home" */
      './index'
    ),
  {fallback: <LoadingPage />}
)
