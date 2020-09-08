import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "FETCH_ORGANIZATION" actions
function* getOrganization(action) {
  try {
    //get organization from database/server
    const response = yield axios.get('/api/organization/' + action.payload);
    // store organizaiton in organization reducer
    console.log('in organizationSaga', response);
    yield put({ type: 'SET_ORGANIZATION', payload: response.data[0] });
    yield put({type: 'FETCH_SITE', payload: response.data[0].id});
    yield put({ type: 'GET_ALL_DEVICE', payload: response.data[0].id});
  } catch (error) {
      console.log('Error with organization get:', error);
  }
}

function* submitOrganization (action) {
  try{
    const response = yield axios.put('/api/organization/submit/' + action.payload);
    console.log( 'in submitOrganization with:', response);
  } catch (error) {
    console.log('Error with organization get:', error);
  }
}


function* organizationSaga() {
  yield takeLatest('FETCH_ORGANIZATION', getOrganization);
  yield takeLatest('SUBMIT_ORGANIZATION', submitOrganization);
}

export default organizationSaga;