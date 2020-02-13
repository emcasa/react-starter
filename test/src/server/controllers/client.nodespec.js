jest.mock('@/config')
jest.mock('@/graphql/client')

import {JSDOM} from 'jsdom'
import request from 'supertest'
import {withExpress} from '@test/helpers/express'
import {createApolloClient} from '@test/helpers/context'

describe('@server/controllers/client', () => {
  describe('GET /', () => {
    withExpress({SSR: false}, (app) => {
      it('responds with status 200', async () => {
        await request(app())
          .get('/')
          .expect(200)
          .then((res) => {
            const dom = new JSDOM(res.text)
            const root = dom.window.document.getElementById('root')
            root.innerHTML.should.equal('')
          })
      })
    })

    withExpress({SSR: true}, (app) => {
      it('responds with status 200', async () => {
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
    })
  })
})
