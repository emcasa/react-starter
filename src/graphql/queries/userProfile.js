import gql from 'graphql-tag'

export default gql`
  query userProfile {
    userProfile {
      id
      name
      email
      phone
      role
    }
  }
`
