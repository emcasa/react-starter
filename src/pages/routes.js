import {Route, Switch} from 'react-router-dom'
import PrivateRoute from '@/components/auth/PrivateRoute'
import ErrorPage from './error'
import HomePage from './home'
import LoginPage from './login'

export default function Router() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <PrivateRoute authorize={Boolean} path="/private" component={HomePage} />
      <Route
        component={() => <ErrorPage statusCode={404} title="Not found" />}
      />
    </Switch>
  )
}
