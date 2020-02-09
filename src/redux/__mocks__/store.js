import {applyMiddleware, compose} from 'redux'
import createSagaMiddleware, {END} from 'redux-saga'
import {routerMiddleware} from 'connected-react-router'

import createReducer from '../modules/reducer'
import createSaga from '../modules/saga'

const createStore = (middleware) =>
  compose(applyMiddleware(...middleware))(require('redux').createStore)

function createMiddleware(context) {
  const middleware = new Map([])
  middleware.set('saga', createSagaMiddleware({context}))
  if (context.history)
    middleware.set('router', routerMiddleware(context.history))
  return middleware
}

export default function createReduxStore(context, preloadedState = {}) {
  const saga = createSaga(context)
  const reducer = createReducer(context)
  const middleware = createMiddleware(context)

  const store = createStore(middleware.values())(reducer, preloadedState)

  // Redux saga helpers
  store.runSaga = (_) => {
    store.task = middleware.get('saga').run(_)
  }
  store.close = () => store.dispatch(END)
  store.runSaga(saga)

  return store
}
