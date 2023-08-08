import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//import reportWebVitals from "./reportWebVitals";
//import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
//프로젝트에 redux-thunk / redux-saga 적용
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer, { rootSaga } from "./modules";
import createSagaMiddleware from "redux-saga";
//595 성능최적화를 위해 모든 자바스크립트파일을 동시에 받아온다 프로덕션 환경에서 서버사이드렌더링을 했을때만 모든스크립트가 로딩되고 나서 렌더링 하도록 처리
import { loadableReady } from "@loadable/component";

//580 redux-saga 스토어 생성할때 미들웨워 적용
const sagaMiddleware = createSagaMiddleware();
//574 렌더링하는 과정에서 만들어진 스토어의 상태를 브라우저에서 재사용하지 못한다
//574 서버에서 만들어 준 상태를 브라우저에서 재사용적용
//574 스토어 생성과정에서 적용시키면 된다.
//574 window.__PRELOADED_STATE__,
//스토어생성
const store = createStore(
  rootReducer,
  window.__PRELOADED_STATE__,
  applyMiddleware(thunk, sagaMiddleware)
);
sagaMiddleware.run(rootSaga);
//Provider 컴포넌트를 사용하여 프로젝트에 리덕스를 적용
const root = ReactDOM.createRoot(document.getElementById("root"));

//595 성능최적화를 위해 모든 자바스크립트파일을 동시에 받아온다 프로덕션 환경에서 서버사이드렌더링을 했을때만 모든스크립트가 로딩되고 나서 렌더링 하도록 처리
//596 프로덕션 환경에서는 loadableReady를 호출하여 필요한 데이터가 로드될 때까지 대기합니다.
async function render() {
  if (process.env.node_env === "production") {
    await loadableReady();
  }
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

render();
//serviceWorker.unregister();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
