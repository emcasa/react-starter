import morgan from 'morgan'

const NODE_ENV = process.env.NODE_ENV

const logFormat = () => {
  switch (NODE_ENV) {
    case 'production':
      return 'common'
    default:
      return 'dev'
  }
}

export default () => {
  if (NODE_ENV === 'test') return (_, __, next) => next()
  return morgan(logFormat())
}
