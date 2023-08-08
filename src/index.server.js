//546 웹팩에서 가장먼저 불러오는 파일
//546 entry 파일
//[[서버]]
import ReactDOMServer from "react-dom/server";
//556 express 서버사이드렌더링을 처리할 서버를 작성 Node.js 웹 프레임워크 사용하여 웹서버 생성
import express from "express";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
//559 서버사이드렌더링 정적 파일 제공하기 | 서버를 통해 build에 있는 js -> Css 정적 파일들에게 접근할 수 있도록 한다
import path from "path";
import fs from "fs";
//572 서버에서 리덕스 설정 및 PreloadContext 사용하기
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./modules";
import PreloadContext from "./lib/PreloadContext";
//584 redux-saga 리덕스 설정 서버사이드렌더링 작업
import createSagaMiddleware from "redusx-saga";
import rootReducer, { rootSaga } from "./modules";
import { END } from "redux-saga";
//593 필요한 청크 파일 경로 추출하기
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";

//559 서버사이드렌더링 정적 파일 제공하기
//560 asset-manifest.json 파일 경로들을 조회한다
// asset-manifest.json에서 파일 경로들을 조회합니다.
const manifest = JSON.parse(
  fs.readFileSync(path.resolve("./build/asset-manifest.json"), "utf8")
);
// html내부에 파일을 삽입해준다
// stateScript --> 변경 tags
function createPage(root, tags) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1,shrink-to-fit=no"
    />
    <meta name="theme-color" content="#000000" />
    <title>React App</title>
    ${tags.styles}
    ${tags.links}
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">${root}</div>
    ${tags.scripts}
  </body>
  </html>
    `;
}

//서버 사이드 렌더링 웹서버
const app = express();
//서버 사이드 렌더링을 처리할 핸들러 함수입니다.
const serverRender = async (req, res, next) => {
  // 이함수는 404가 떨야 하는 상황에 404를 띄우지 않고 서버 사이드 렌더링을 해줍니다

  // StaticRouter -> 서버사이드렌더링에 사용되는 컴포넌트. location 값에 따라 라우팅 | context 나중에 렌더링한 컴포넌트에 따라 HTTP 상태 코드를 설정
  const context = {};
  //584 서버에서 rudux-saga 사용하기
  const sagaMiddleware = createSagaMiddleware();
  // 573 서버에서 리덕스 설정 및 PreloadContext 사용하기
  // 573 주의할점은 서버가 실행될 때 스토어를 한 번만 만드는 것이 아니라, 요청이 들어올때마다 새로운 스토어를 만든다
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk, sagaMiddleware)
  );

  const sagaPromise = sagaMiddleware.run(rootSaga).toPromise();

  //sagaMiddleware.run(rootSaga);

  const preloadContext = {
    done: false,
    promises: [],
  };

  //594 필요한 청크파일 추출하기 위한 ChunkExtractor
  const extrctor = new ChunkExtractor({ statsFile });

  //573 주의할점은 서버가 실행될 때 스토어를 한 번만 만드는 것이 아니라, 요청이 들어올때마다 새로운 스토어를 만든다
  //594 필요한 청크파일 추출하기 위한 ChunkExtractor
  const jsx = (
    <ChunkExtractorManager extractor={extractor}>
      <PreloadContext.Provider value={preloadContext}>
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      </PreloadContext.Provider>
    </ChunkExtractorManager>
  );
  //574 PreloadContext 적용으로 한번더 렌더링을 한다 renderToStaticMarkup 정적인 페이지를 만들 때 사용한다
  //574 renderToStaticMarkup 사용한 이유는 Preloader로 넣어주었던 함수를 호출하기 위해서 이다.
  //574 PreloadContext 적용
  ReactDOMServer.renderToStaticMarkup(jsx); // 렌더링을 한다
  //586 redux-saga 서버사이드렌더링작업
  store.dispatch(END); //redux-saga의 END 액션을 발생시키면 액션을 모니터링하는 사가들이 모두 종료된다
  try {
    await sagaPromise; //586 기존에 진행 중이던 사가들이 모두 끝날 때까지 기다립니다.
    await Promise.all(preloadContext.promises); // 모든 프로미스를 기다립니다.
  } catch (e) {
    return res.status(500);
  }
  preloadContext.done = true;

  const root = ReactDOMServer.renderToString(jsx); // 렌더링을 한다
  //575 서버에서 만들어준 상태를 브라우저에서 재사용하려면  현재스토어 상태를 문자열로 변환한뒤 스크립트로 주입해주어야 한다
  const stateString = JSON.stringify(store.getState()).replace(/</g, "\\u003c");
  const stateScript = `<script>__PRELOADED_STATE__ = ${stateString}</script>`;

  //595 청크 미리불러와야 하는 스타일/스크립트 추출하기
  const tags = {
    script: stateScript + extractor.getScriptTags(), //스트립트 앞부분에 리덕스 상태 넣기
    links: extrctor.getLinkTags(),
    styles: extrctor.getStyleTags(),
  };
  res.send(createPage(root, tags)); // 클라이언트에게 결과물을 응답한다 stateScript---> tags로변경 595
};
//서버 사이드 렌더링 정적 파일 제공하기
const serve = express.static(path.resolve("./build"), {
  index: false, // "/" 경로에서 index.html을 보여 주지 않도록 설정
});
app.use(serve); // 순서가 중요하다. serverRender 전에 위치
app.use(serverRender);

//500 포트로 서버를 가동한다
app.listen(5000, () => {
  console.log("Running on http://localhost:5000");
});

// const html = ReactDOMServer.renderToString(
//   <div>Hello Server Side Rendering</div>
// );
// console.log(html);
