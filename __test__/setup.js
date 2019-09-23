import {JSDOM} from 'jsdom'
import chai from 'chai'
import chaiThings from 'chai-things'
import Helmet from 'react-helmet'

const dom = new JSDOM('<!doctype html><html><body id="root"></body></html>')

global.window = dom.window
global.document = dom.window.document
global.navigator = {userAgent: 'node.js'}

chai.use(chaiThings)

global.should = chai.should()
global.expect = chai.expect

Helmet.canUseDom = false
