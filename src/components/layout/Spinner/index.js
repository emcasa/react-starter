import styled from 'styled-components'
import Spinner from 'react-spinners/PulseLoader'

export default styled((props) => (
  <div>
    <Spinner {...props} />
  </div>
)).attrs(({theme}) => ({
  color: theme.colors.pink
}))``
