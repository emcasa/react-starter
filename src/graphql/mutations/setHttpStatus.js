import gql from 'graphql-tag'

export default gql`
  mutation setHttpStatus($code: Number!, $message: String) {
    setHttpStatus(code: $code, message: $message) @client
  }
`
