//컨테이너컴포넌트
//redux store와 연결
//464 hook을 사용 useSelector | useDispatch
import { useEffect } from "react";
import User from "../components/User";
//import Users from "../componets/Users";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../modules/users";
//571 서버사이드렌더링 첫렌더링이후 데이터 요청시 PreloadContext를 활용해서 데이터를 수집해 다시 렌더후 보여주는 형식적용
//588
import { usePreloader } from "../lib/PreloadContext";

//컴포넌트
//useSelector redux connect 필요없어 redux 연결해서 상태조회
//useDispatch 액션실행/전달
//582 redux-saga 프레젠테이셔널 컴포넌트에서 유효성 검사를 해당 컨터에너 컴포넌트에서 처리 id값을 props로 전달받아 비교
const UserContainer = ({ id }) => {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  //588 usePreloader 커스텀훅 적용
  usePreloader(() => dispatch(getUser(id))); //서버사이드 렌더링을 할때 api 호출하기

  //컴포넌트가 마운트되고 나서 호출 특정작업
  useEffect(() => {
    //if (users) return;  users가 이미 유효하다면 요청하지 않음
    //582 redux-saga 중복요청방지목적 유효성검사 user값확인 | id가 일치하는지 확인 | id값이 url파라미터를 통해 받아와서 문자열을 숫자로 형변환후 비교
    // 사용자가 존재하고, id가 일치한다면 요청하지 않음
    if (user && user.id === parseInt(id, 10)) return;
    dispatch(getUser(id)); // 미들웨워 axios 비동기 데이터작업 호출
  }, [dispatch, id, user]); // 업데이트 일어날시 useEffect

  //572 PreloadContext 적용 페이지 참고 하단 소스 삭제시킴
  //582 컨테이너 유효성 검사 후 return null을 해야 하는 경우에 null대신 Preloader 반환
  //582 컨테이너 유효성 검사를 할때 아직 정보가 없는 경우에는 user 값이 null을 가르킨다.
  //582 User 프레젠테이셔널 컴포넌트가 렌더링 되지 않도록 컨테이너 컴포넌트에서 null을 반환해 주어야한다.
  //582 서버사이드렌더링을 해야 하기때문에 null이 아닌, Preloader 컴포넌트를 렌더링하여 반환한다
  if (!user) return null;
  return (
    <>
      <User user={user} />;
    </>
  );
};
export default UserContainer;
