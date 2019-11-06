import {graphql} from 'react-apollo'
import {compose, lifecycle} from 'recompose'
import SET_HTTP_STATUS from '@/graphql/mutations/setHttpStatus'
import ErrorPage from './ErrorPage'

/**
 * Forcibly set GraphQL's httpStatus to this page's response
 * to return the correct status code in the server when rendering
 * `ErrorPage` outside of an `ErrorBoundary`.
 */
function emitError() {
  if (this.props.emit) this.props.emitHttpStatus()
}

export default compose(
  graphql(SET_HTTP_STATUS, {
    props: ({mutate, ownProps}) => ({
      emitHttpStatus: () =>
        mutate({variables: {code: ownProps.code, message: ownProps.message}})
    })
  }),
  lifecycle({
    UNSAFE_componentWillMount: !process.browser ? emitError : undefined,
    componentDidMount: emitError
  })
)(ErrorPage)
