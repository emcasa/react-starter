import renderDocument from '@/pages/document/render'

export default async function errorHandler(error, req, res, _next) {
  console.error(error)
  if (req.url !== '/error') res.redirect('/error')
  else res.status(500).send(await renderDocument())
}
