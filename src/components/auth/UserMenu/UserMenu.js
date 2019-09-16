import Row from '@emcasa/ui-dom/components/Row'
import Button from '@emcasa/ui-dom/components/Button'
import Text from '@emcasa/ui-dom/components/Text'
import Icon from '@emcasa/ui-dom/components/Icon'

export default function UserMenu({user, onLogOut}) {
  return (
    <Row alignItems="center">
      <Text fontSize={18} color="white">
        Hello, {user.name}
      </Text>
      <Button link mrl={2} onClick={onLogOut}>
        <Icon name="sign-out-alt" color="white" />
      </Button>
    </Row>
  )
}
