// [[모듈설명]]
// 미들웨워
// duks패턴
// 서버사이드렌더링 api 요청 | 비동기 작업 |thunk
// 데이터를 가져오는 로직작성
import axios from "axios";
//578 redux-saga api 요청 | 비동기 작업 | 특정 사용자의 정볼르 가져온다
import { call, put, takeEvery } from "redux-saga/effects";

//액션타입이름정의 | 이름들의 액션을 상태관리 한다
const GET_USERS_PENDING = "users/GET_USERS_PENDING";
const GET_USERS_SUCCESS = "users/GET_USERS_SUCCESS";
const GET_USERS_FAILURE = "users/GET_USERS_FAILURE";

//액션타입이름정의 | 이름들의 액션을 상태관리 한다
//578 redux-saga
const GET_USER = "users/GET_USER";
const GET_USER_SUCCESS = "users/GET_USER_SUCCESS";
const GET_USER_FAILURE = "users/GET_USER_FAILURE";

//액션생성함수=객체생성
const getUsersPending = () => ({ type: GET_USERS_PENDING });
const getUsersSuccess = (payload) => ({ type: GET_USERS_SUCCESS, payload });
const getUsersFailure = (payload) => ({
  type: GET_USERS_FAILURE,
  error: true,
  payload,
});

//578 redux-saga
//액션생성함수=객체생성
export const getUser = (id) => ({ type: GET_USER, payload: id });
export const getUserSuccess = (data) => ({
  type: GET_USER_SUCCESS,
  payload: data,
});
export const getUserFailure = (error) => ({
  type: GET_USER_FAILURE,
  payload: error,
  error: true,
});

//thunk 미들웨워 api 요청 비동기 작업
export const getUsers = () => async (dispatch) => {
  try {
    dispatch(getUsersPending()); //액션실행/전달
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    dispatch(getUsersSuccess(response)); //성공시 응답
  } catch (e) {
    dispatch(getUsersFailure(e)); // 실패
    throw e;
  }
};

//578 redux-saga 미들웨워 api 요청 비동기 작업
const getUserById = (id) =>
  axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
//578 재네레이터함수-saga
function* getUserSaga(action) {
  try {
    const response = yield call(getUserById, action.payload); //yield 해당값을 조회할수 있게 만든다.
    yield put(getUserSuccess(response.data)); //성공시
  } catch (e) {
    yield put(getUserFailure(e)); //실패시
  }
}
//578 재네레이터함수-saga
//takeEvery는 들어오는 모든 액션에 대해 특정 작업을 처리해준다
export function* usersSaga() {
  yield takeEvery(GET_USER, getUserSaga);
}
// 초기값 // 초기상태
// 로딩/에러를 객체로 만든 이유는 rudux-saga를 사용한 서버사이드렌더링 학습할때 단하나의 사용자 정보를 가져오는 다른 api를 호출하기 위함
// loding {} 객체에 넣어준 이유는 api 한개이상으로 각값에 이름을 지어주는 대신 객체에 넣어줌 | loadingUsers, loadingUser
const initialState = {
  users: null,
  user: null,
  loading: {
    users: false,
    user: false,
  },
  error: {
    users: null,
    user: null,
  },
};

//리듀서 THUNK와 SAGA 처리
function users(state = initialState, action) {
  //THUNK
  switch (action.type) {
    case GET_USERS_PENDING:
      return { ...state, loading: { ...state.loading, users: true } };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, users: false },
        users: action.payload.data,
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, users: false },
        error: { ...state.error, users: action.payload },
      };
    //SAGA
    case GET_USER:
      return {
        ...state,
        loading: { ...state.loading, user: true },
        error: { ...state.error, user: null },
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, user: false },
        user: action.payload,
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, user: false },
        error: { ...state.error, user: action.payload },
      };

    default:
      return state;
  }
}

export default users;
