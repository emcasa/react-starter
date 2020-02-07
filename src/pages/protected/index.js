import ProtectedPage from './ProtectedPage'
import requireAuthentication from '@/components/auth/hoc/requireAuthentication.js'

export default requireAuthentication(ProtectedPage)
