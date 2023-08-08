//라우트설정
import { Route, Routes } from "react-router-dom";
//Menu Link to | RedPage, BluePage 페이지컴포넌트
import Menu from "./components/Menu";
//import RedPage from "./pages/RedPage";
//import BluePage from "./pages/BluePage";
//569 컨테이너컴포넌트를 보여줄 단순 페이지컴포넌트를 라우트 설정
//import UsersPage from "./pages/UsersPage";
//590 라우트 컴포넌트 스플리팅하기
import loadable from "@loadable/component";

//590 라우트 컴포넌트 스플리팅하기
//590 개발자도구에서 속도를 늦추고 확인하면 깜빡임 현상을 확인할수 있다
//591 웹팩과 babel 플러그인 적용시키면 깜빡임 현상을 해결할수 있다 package.json 설정
const RedPage = loadable(() => import("./pages/RedPage"));
const BluePage = loadable(() => import("./pages/BluePage"));
const UsersPage = loadable(() => import("./pages/UsersPage"));

const App = () => {
  return (
    <div>
      <Menu />
      <hr />
      <Routes>
        <Route path="/red" element={<RedPage />} />
        <Route path="/blue" element={<BluePage />} />
        <Route path="/users/*" element={<UsersPage />} />
      </Routes>
    </div>
  );
};

export default App;
