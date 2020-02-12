import chai from 'chai'
import chaiThings from 'chai-things'

chai.use(chaiThings)

global.should = chai.should()
global.context = global.describe
