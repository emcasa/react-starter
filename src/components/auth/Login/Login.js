import Button from '@emcasa/ui-dom/components/Button'
import Text from '@emcasa/ui-dom/components/Text'
import Row from '@emcasa/ui-dom/components/Row'

export default function LoginView({onEmailLogin, onSmsLogin}) {
  return (
    <Row
      flexDirection="column"
      width="100%"
      height="100%"
      maxWidth={500}
      alignItems="stretch"
      justifyContent="center"
      margin="auto"
    >
      <Row justifyContent="center">
        <Text fontSize="large">Login with AccountKit</Text>
      </Row>
      <Row mt={2}>
        <Button flex={1} active onClick={onEmailLogin}>
          Login via Email
        </Button>
      </Row>
      <Row mt={2}>
        <Button flex={1} active onClick={onSmsLogin}>
          Login via SMS
        </Button>
      </Row>
    </Row>
  )
}
