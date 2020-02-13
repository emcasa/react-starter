import {NavLink} from 'react-router-dom'
import Row from '@emcasa/ui-dom/components/Row'
import Button from '@emcasa/ui-dom/components/Button'
import UserMenu from '@/components/auth/UserMenu'

export default function Nav({user}) {
  return (
    <Row as="nav" alignItems="center">
      <NavLink to="/">
        <Button link color="white">
          Home
        </Button>
      </NavLink>
      {user ? (
        <UserMenu user={user} />
      ) : (
        <NavLink to="/login">
          <Button link color="white">
            Login
          </Button>
        </NavLink>
      )}
    </Row>
  )
}
