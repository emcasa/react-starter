import Shell from '@/components/layout/Shell'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'

export default function ErrorPage({statusCode, title}) {
  return (
    <Shell>
      <Row>
        <Text fontSize="large">{statusCode}:</Text>
      </Row>
      <Row>
        <Text>{title}</Text>
      </Row>
    </Shell>
  )
}
