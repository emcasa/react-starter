import {graphql} from 'react-apollo'
import {withRouter} from 'react-router-dom'
import {compose} from 'recompose'
import GET_HTTP_STATUS from '@/graphql/queries/httpStatus'
import RedirectToLoginPage from './RedirectToLoginPage'
import ErrorPage from './ErrorPage'

const withHttpStatus = graphql(GET_HTTP_STATUS, {
  props: ({data}) => ({
    status: data.httpStatus
  })
})

export default compose(
  withRouter,
  withHttpStatus
)(function ErrorBoundary({status, location, children}) {
  switch ((status && status.code) || 200) {
    case 200:
      return children
    case 401:
      return <RedirectToLoginPage location={location} />
    default:
      return <ErrorPage {...status} />
  }
})
