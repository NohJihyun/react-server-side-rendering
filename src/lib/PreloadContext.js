// 서버사이드 렌더링을 할시 useEffect | componentDidMount 첫렌더링 실행뒤 호출하면 서버환경에서는 호출되지 않는다
// 즉, 서버사이드렌더링은 서버에서 첫랜더링 작업을 해주는데 서버환경에서 이후 데이터요청 될시 보여줄때 Preloader 컴포넌트를 만들어서 PreloadContext를 만들어 처리
// 렌더링 하기전 api 요청한뒤 스토어에 담아야하고, 요청이 끝날때까지 기달렸다가 다시 렌더링해서 요청된 데이터를 보여주는 형식으로 진행
// 서버사이드 렌더링을 하는 과정에서 처리해야 할 작업들을 실행하고, 기다려야 하는 프로미스가 있으면 프로미스를 수집한다
// 다시 렌더링하면 데이터가 채워진 상태로 컴포넌트들이 나타나게 된다.
import { createContext, useContext } from "react";

//클라이언트환경: null
//서버환경: {done: false, promises:[]}
const PreloadContext = createContext(null);
export default PreloadContext;
//컴포넌트가 렌더링될 때 서버환경에서만 resolve 함수를 호출해준다
//resolve는 함수 타입입니다. Props로 받아온다
export const Preloader = ({ resolve }) => {
  const preloadContext = useContext(PreloadContext);
  if (!preloadContext) return null; // context 값이 유효하지 않다면 아무것도 하지 않음
  if (preloadContext.done) return null; //이미 작업이 끝났다면 아무것도 하지 않음

  // promise 배열에 프로미스 등록
  // 설령 resolve 함수가 프로미스를 반환하지 않더라도, 프로미스 취급을 하기위해 Promise.resolve 함수사용
  preloadContext.promise.push(Promise.resolve(resolve()));
  return null;
};

//588 커스텀 hook을 만들어서 preload 간편하게 사용하기
//hook 형태로 사용할 수 있는 함수
export const usePreloader = (resolve) => {
  const preloadContext = useContext(PreloadContext);
  if (!preloadContext) return null;
  if (preloadContext.done) return null;
  preloadContext.promises.puch(Promise.resolve(resolve()));
};
