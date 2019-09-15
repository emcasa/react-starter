export const API_URL = process.env.API_URL

export const WS_URL = WS_URL || `${API_URL.replace(/^http/, 'ws')}/socket`

export const APOLLO_ENGINE_URL =
  process.env.APOLLO_ENGINE_URL || `${API_URL}/graphql_api`
