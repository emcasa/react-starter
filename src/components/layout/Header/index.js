import Row from '@emcasa/ui-dom/components/Row'
import Nav from './Nav'

export default function Header() {
  return (
    <Row
      as="header"
      width="100%"
      bg="pink"
      alignItems="center"
      justifyContent="flex-end"
      py={2}
      px={4}
      style={{boxSizing: 'border-box'}}
    >
      <Nav />
    </Row>
  )
}
