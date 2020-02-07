import path from 'path'
import {JSDOM} from 'jsdom'
import chai from 'chai'
import chaiThings from 'chai-things'
import Helmet from 'react-helmet'

/*
 * Global server environment
 */

process.env.RAZZLE_ASSETS_MANIFEST = path.resolve('./package.json')
process.env.SSR = false

const dom = new JSDOM('<!doctype html><html><body id="root"></body></html>')

/*
 * Global browser environment

global.window = dom.window
global.document = dom.window.document
global.navigator = {userAgent: 'node.js'}

// Helmet.canUseDom = false

/*
 * Expectations
 */

chai.use(chaiThings)

global.should = chai.should()
