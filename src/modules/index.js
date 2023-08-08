//[[모듈설명]]
//리듀서 합치기
//류트리듀서
//thunk
//saga
import { combineReducers } from "redux";
import users, { usersSaga } from "./users";
import { all } from "redux-saga/effects";

//redux-saga 리듀서
export function* rootSaga() {
  yield all([usersSaga()]);
}

const rootReducer = combineReducers({ users });
export default rootReducer;
