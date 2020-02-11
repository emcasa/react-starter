import Row from '@emcasa/ui-dom/components/Row'
import Button from '@emcasa/ui-dom/components/Button'
import Text from '@emcasa/ui-dom/components/Text'
import Icon from '@emcasa/ui-dom/components/Icon'

export default function UserMenu({color, user, onLogOut}) {
  return (
    <Row alignItems="center">
      <Text fontSize={18} color={color}>
        Hello, {user.name}
      </Text>
      <Button link mrl={2} onClick={onLogOut}>
        <Icon name="sign-out-alt" color={color} />
      </Button>
    </Row>
  )
}

UserMenu.defaultProps = {
  color: 'white'
}
