import renderDocument from './node_modules/@/pages/document/render'

export default async function errorHandler(error, req, res, _next) {
  if (req.url !== '/error') res.redirect('/error')
  else renderDocument()
}
