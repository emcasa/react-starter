export default function setHttpStatus(_obj, variables, {cache}) {
  const httpStatus = {
    code: variables.code,
    message: variables.message,
    __typename: 'HttpStatus'
  }
  cache.writeData({data: {httpStatus}})
  return httpStatus
}
