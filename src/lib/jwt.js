import Cookie from 'js-cookie'

export const persist = (jwt) => Cookie.set('token', jwt)

export const reset = () => Cookie.remove('token')

export const getToken = (req) =>
  (req ? require('cookie').parse(req.headers.cookie || '') : Cookie.get()).token
