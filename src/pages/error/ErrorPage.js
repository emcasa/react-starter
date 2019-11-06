import Shell from '@/components/layout/Shell'
import Header from '@/components/layout/Header'
import Body from '@/components/layout/Body'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'

export default function ErrorPage({code, message}) {
  return (
    <Shell>
      <Header />
      <Body>
        <Row flexDirection="column" margin="auto">
          <Text fontSize="xlarge" color="pink" inline>
            {code}
          </Text>
          <Text inline>{message}</Text>
        </Row>
      </Body>
    </Shell>
  )
}
