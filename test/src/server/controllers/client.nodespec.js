jest.mock('@/config')
jest.mock('@/graphql/client')

import {JSDOM} from 'jsdom'
import request from 'supertest'
import {withExpress} from '@test/helpers/express'
import {createApolloClient} from '@test/helpers/context'

describe('@server/controllers/client', () => {
  describe('GET /', () => {
    withExpress({SSR: false}, (app) => {
      it('responds with empty document', async () => {
        await request(app())
          .get('/')
          .expect(200)
          .then((res) => {
            const dom = new JSDOM(res.text)
            dom.window.document
              .querySelectorAll('script[data-chunk=client]')
              .length.should.gt(1)
            dom.window.document
              .getElementById('root')
              .innerHTML.should.equal('')
          })
      })
    })

    withExpress({SSR: true}, (app) => {
      it('responds with non empty document', async () => {
        await request(app())
          .get('/')
          .expect(200)
          .then((res) => {
            const dom = new JSDOM(res.text)
            const root = dom.window.document.getElementById('root')
            root.innerHTML.should.not.equal('')
          })
      })

      it('responds with the same status as the graphql server', async () => {
        const apolloClient = () =>
          createApolloClient({
            initialState: {
              httpStatus: {code: 420, message: 'Eyy', __typename: 'HttpStatus'}
            }
          })
        await request(app({apolloClient}))
          .get('/')
          .expect(420)
          .send()
      })

      it('renders loadable assets', async () => {
        await request(app())
          .get('/')
          .expect(200)
          .then((res) => {
            const dom = new JSDOM(res.text)
            dom.window.document
              .querySelectorAll('script[data-chunk=client]')
              .length.should.gt(1)
            dom.window.document
              .querySelectorAll('script[data-chunk=pages\\/home]')
              .length.should.gt(1)
          })
      })
    })
  })
})
