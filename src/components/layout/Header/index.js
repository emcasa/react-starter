import {NavLink} from 'react-router-dom'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Button from '@emcasa/ui-dom/components/Button'

export default function Header() {
  return (
    <Row
      as="header"
      width="100%"
      bg="pink"
      alignItems="center"
      justifyContent="center"
    >
      <Col as="nav" flex={1} my={2} mx={4}>
        <NavLink to="/">
          <Button link color="white">
            Home
          </Button>
        </NavLink>
        <NavLink to="/login">
          <Button link color="white">
            Login
          </Button>
        </NavLink>
      </Col>
    </Row>
  )
}
