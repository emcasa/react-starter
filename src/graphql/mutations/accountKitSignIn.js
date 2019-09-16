import gql from 'graphql-tag'

export default gql`
  mutation accountKitSignIn($accessToken: String!) {
    accountKitSignIn(accessToken: $accessToken) {
      jwt
      user {
        name
        id
        email
        phone
        role
      }
    }
  }
`
