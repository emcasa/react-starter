import {call, takeEvery, getContext} from 'redux-saga/effects'
import {LOCATION_CHANGE} from 'connected-react-router'
import SET_HTTP_STATUS from '@/graphql/mutations/setHttpStatus'

function* resetHttpStatus() {
  const apolloClient = yield getContext('apolloClient')
  yield call([apolloClient, apolloClient.mutate], {
    mutation: SET_HTTP_STATUS,
    variables: {code: 200, message: 'OK'}
  })
}

export default function* httpSaga() {
  yield takeEvery(LOCATION_CHANGE, resetHttpStatus)
}
