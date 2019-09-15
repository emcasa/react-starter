import {all} from 'redux-saga'

export default () =>
  function* root() {
    return yield all([
      /* sagas */
    ])
  }
