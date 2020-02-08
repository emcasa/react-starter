jest.mock('@/config')
jest.mock('@/graphql/client')

import request from 'supertest'
import {withExpress} from '@test/helpers/express'

describe('@server/controllers/client', () => {
  describe('GET /', () => {
    withExpress({SSR: false}, (app) => {
      it('responds with status 200', async () => {
        await request(app)
          .get('/')
          .expect(200)
          .send()
      })
    })

    withExpress({SSR: true}, (app) => {
      it('responds with status 200', async () => {
        await request(app)
          .get('/')
          .expect(200)
          .send()
      })
    })
  })
})
