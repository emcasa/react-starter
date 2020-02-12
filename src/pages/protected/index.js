import ProtectedPage from './ProtectedPage'
import requireAuthentication from '@/lib/hoc/requireAuthentication.js'

export default requireAuthentication(ProtectedPage)
