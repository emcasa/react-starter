import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Input from '@emcasa/ui-dom/components/Input'

export default function PhoneInput({value, onChange}) {
  const onChangeInput = (e) =>
    onChange(Object.assign({}, value, {[e.target.name]: e.target.value}))
  return (
    <Row flex={1}>
      <Col mr={2}>
        <Input
          hideErrorView
          hideLabelView
          placeholder="DDD"
          name="areaCode"
          value={value.areaCode}
          onChange={onChangeInput}
          size="4"
          maxLength="4"
          pattern="\d*"
        />
      </Col>
      <Col flex={1}>
        <Input
          hideErrorView
          hideLabelView
          placeholder="Telefone"
          type="phone"
          name="phone"
          value={value.phone}
          onChange={onChangeInput}
        />
      </Col>
    </Row>
  )
}

PhoneInput.defaultProps = {
  value: {
    phone: '',
    areaCode: ''
  }
}
