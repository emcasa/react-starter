import {renderDocument} from '@/lib/ssr'

/**
 * Renders an empty document
 */
export default async function offlineDocument(_req, res) {
  res.status(200).send(await renderDocument())
}
