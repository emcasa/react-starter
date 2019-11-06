import gql from 'graphql-tag'

export default gql`
  query httpStatus {
    httpStatus @client {
      code
      message
    }
  }
`
