import request from 'supertest'
import app from '@/server/server'
import schema from '@/graphql/client'

describe('@server/controllers/client', () => {
  describe('GET /', () => {
    it('responds with status 200', async () => {
      await request(app)
        .get('/')
        .expect(200)
        .send()
    })
  })
})
