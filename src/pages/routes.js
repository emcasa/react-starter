import React, {Fragment} from 'react'
import {Route, Switch} from 'react-router-dom'
import PrivateRoute from '@/components/auth/PrivateRoute'
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

const ErrorRoutes = () => (
  <Fragment>
    <Route exact path="/error" component={Error} />
    <Route component={NotFound} />
  </Fragment>
)

export default function Router() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <PrivateRoute authorize={Boolean} path="/private" component={HomePage} />
      {/* Errors */}
      <ErrorRoutes />
    </Switch>
  )
}
