import Row from '@emcasa/ui-dom/components/Row'

export default function Body({children}) {
  return (
    <Row
      as="main"
      width="100%"
      flex={1}
      p={2}
      style={{boxSizing: 'border-box'}}
    >
      {children}
    </Row>
  )
}
