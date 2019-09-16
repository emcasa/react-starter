import {NavLink} from 'react-router-dom'
import Col from '@emcasa/ui-dom/components/Col'
import Button from '@emcasa/ui-dom/components/Button'
import UserMenu from '@/components/auth/UserMenu'

export default function Nav({user}) {
  return (
    <Col as="nav">
      <NavLink to="/">
        <Button link color="white">
          Home
        </Button>
      </NavLink>
      {user ? (
        <UserMenu />
      ) : (
        <NavLink to="/login">
          <Button link color="white">
            Login
          </Button>
        </NavLink>
      )}
    </Col>
  )
}
