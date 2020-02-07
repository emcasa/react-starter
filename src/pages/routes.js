import {Route, Switch} from 'react-router-dom'
import ErrorBoundary from './error/ErrorBoundary'
import ErrorPage from './error'
import HomePage from './home'
import ProtectedPage from './protected'
import LoginPage from './login'

const NotFound = () => <ErrorPage emit statusCode={404} message="Not found" />

export default function Router() {
  return (
    <ErrorBoundary>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/protected" component={ProtectedPage} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  )
}
