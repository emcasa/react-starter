import {Route, Switch} from 'react-router-dom'
import ErrorPage from './error'
import HomePage from './home'
import LoginPage from './login'

const NotFound = (props) => (
  <ErrorPage {...props} statusCode={404} message="Not found" />
)

const Error = (props) => {
  const state = props.location.state || {}
  return (
    <ErrorPage
      {...props}
      statusCode={state.statusCode || 500}
      message={state.message || 'Internal error'}
    />
  )
}

export default function Router() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      {/* Errors */}
      <Route exact path="/error" component={Error} />
      <Route component={NotFound} />
    </Switch>
  )
}
