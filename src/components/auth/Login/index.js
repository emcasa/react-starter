import {useState} from 'react'
import Button from '@emcasa/ui-dom/components/Button'
import Row from '@emcasa/ui-dom/components/Row'
import Login from '@emcasa/login/lib/LoginSaga'
import PhoneInput from './PhoneInput'

const sanitizePhoneInput = ({phone = '', areaCode = ''}) =>
  `${areaCode}${phone}`.replace(/[^\d]/g, '')

export default function LoginView() {
  const [phone, setPhone] = useState()

  return (
    <Row
      as="form"
      margin="auto"
      onSubmit={(e) => {
        e.preventDefault()
        window.EmCasaLogin.open(sanitizePhoneInput(phone)) // 😩
        return false
      }}
    >
      <Row
        flexDirection="column"
        width="100%"
        height="100%"
        maxWidth={500}
        alignItems="stretch"
        justifyContent="center"
        margin="auto"
      >
        <Row my={3}>
          <PhoneInput value={phone} onChange={setPhone} />
        </Row>
        <Row>
          <Button active flex={1} height="tall" type="submit">
            Entrar
          </Button>
        </Row>
      </Row>
      <Login />
    </Row>
  )
}
