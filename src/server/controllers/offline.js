import {renderDocument} from '@/lib/ssr'

/**
 * Just renders an empty document. This is used by the service worker to cache
 * something to use as a fallback for pages in offline mode.
 */
export default async function offlineDocument(_req, res) {
  res.status(200).send(await renderDocument())
}
