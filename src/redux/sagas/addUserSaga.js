import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* addUser(action) {
  try {
    const response = yield axios.post("/api/user", action.payload);
    yield console.log("In addUser", response.data.id);
    // yield put({ type: "FETCH_ORGANIZATION", payload: response.data.id });
  } catch (error) {
    console.log("Trouble adding User", error);
  }
}

function* addOrganizationSaga() {
  yield takeLatest("ADD_USER", addUser);
}

export default addOrganizationSaga;