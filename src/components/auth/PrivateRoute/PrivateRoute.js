import {Route} from 'react-router-dom'
import PropTypes from 'prop-types'
import ErrorPage from '@/pages/error'

/**
 * Restricts access to paths in react-router.
 */
export default function PrivateRoute({
  user,
  authorize,
  component,
  children,
  errorComponent: ErrorComponent,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !authorize(user) ? (
          <ErrorComponent {...props} />
        ) : (
          render({...props, component, children})
        )
      }
    />
  )
}

const render = (props) => {
  const {component: Component, render, children} = props
  if (typeof children === 'function') return children(props)
  else if (children) return children
  else if (render) return render(props)
  else return <Component {...props} />
}

function ErrorComponent() {
  return <ErrorPage statusCode={401} title="Unauthorized" />
}

PrivateRoute.defaultProps = {
  errorComponent: ErrorComponent
}

PrivateRoute.propTypes = {
  /** Component to render when the user is authorized */
  errorComponent: PropTypes.elementType.isRequired,
  /** Authorize logged in user. Should return boolean */
  authorize: PropTypes.func.isRequired,
  /** Logged in user */
  user: PropTypes.object
}
