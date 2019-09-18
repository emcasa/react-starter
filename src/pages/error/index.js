import {PureComponent} from 'react'
import Shell from '@/components/layout/Shell'
import Header from '@/components/layout/Header'
import Body from '@/components/layout/Body'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'

export default class ErrorPage extends PureComponent {
  UNSAFE_componentWillMount() {
    const {statusCode, staticContext} = this.props
    if (staticContext) staticContext.statusCode = statusCode
  }

  render() {
    const {statusCode, message} = this.props
    return (
      <Shell>
        <Header />
        <Body>
          <Row flexDirection="column" margin="auto">
            <Text fontSize="xlarge" color="pink" inline>
              {statusCode}
            </Text>
            <Text inline>{message}</Text>
          </Row>
        </Body>
      </Shell>
    )
  }
}
