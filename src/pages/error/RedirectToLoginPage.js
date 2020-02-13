import {Redirect} from 'react-router'
import LoginPage from '@/pages/login/lazy'

function RedirectToLoginPage({location}) {
  return (
    <Redirect
      to={{
        pathname: '/login',
        state: {
          returnTo:
            (location.state && location.state.returnTo) || location.pathname
        }
      }}
    />
  )
}

/**
 * Render <LoginPage /> in the server instead of <Redirect />
 * to avoid a 302 response which causes the location's state
 * to be lost.
 */
export default !process.browser ? LoginPage : RedirectToLoginPage
