import {Route, Switch} from 'react-router-dom'
import ErrorPage from './error'
import HomePage from './home'
import LoginPage from './login'

export default function Router() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route
        component={() => <ErrorPage statusCode={404} title="Not found" />}
      />
    </Switch>
  )
}
