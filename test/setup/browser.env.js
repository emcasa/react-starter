import {JSDOM} from 'jsdom'
import Helmet from 'react-helmet'

const dom = new JSDOM('<!doctype html><html><body id="root"></body></html>')

global.window = dom.window
global.document = dom.window.document
global.navigator = {userAgent: 'node.js'}

Helmet.canUseDom = false
