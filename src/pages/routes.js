import {Route, Switch} from 'react-router-dom'
import ErrorBoundary from './error/ErrorBoundary'
import ErrorPage from './error'
import HomePage from './home/lazy'
import LoginPage from './login/lazy'

const NotFound = () => <ErrorPage emit code={404} message="Not found" />

export default function Router() {
  return (
    <ErrorBoundary>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  )
}
