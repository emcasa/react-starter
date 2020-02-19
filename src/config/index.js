const NODE_ENV = process.env.NODE_ENV

export const SSR = process.env.SSR !== 'false'

export const API_URL = process.env.API_URL || 'http://localhost:4000'

export const APOLLO_ENGINE_URL =
  process.env.APOLLO_ENGINE_URL || `${API_URL}/graphql_api`

export const SERVICE_WORKER = process.env.SERVICE_WORKER
  ? process.env.SERVICE_WORKER == 'true'
  : NODE_ENV === 'production'

console.log('SERVICE_WORKER', SERVICE_WORKER)
