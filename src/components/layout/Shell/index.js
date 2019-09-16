import Col from '@emcasa/ui-dom/components/Col'
import GlobalStyle from './GlobalStyle'

export default function Shell({children}) {
  return (
    <Col height="100%">
      <GlobalStyle />
      {children}
    </Col>
  )
}
