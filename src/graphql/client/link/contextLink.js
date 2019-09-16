import {setContext} from 'apollo-link-context'

export default ({getToken}) =>
  setContext((_, {headers}) => {
    const token = getToken()
    return {
      headers: {
        ...headers,
        authorization: token ? `Token ${token}` : ''
      }
    }
  })
