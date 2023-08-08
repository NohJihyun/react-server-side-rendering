//컨테이너컴포넌트
//redux store와 연결
//464 hook을 사용 useSelector | useDispatch
import { useEffect } from "react";
import Users from "../components/Users";
//import Users from "../componets/Users";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../modules/users";
//571 서버사이드렌더링 첫렌더링이후 데이터 요청시 PreloadContext를 활용해서 데이터를 수집해 다시 렌더후 보여주는 형식적용
import { Preloader } from "../lib/PreloadContext";

//컴포넌트
//useSelector redux connect 필요없어 redux 연결해서 상태조회
//useDispatch 액션실행/전달
const UsersContainer = () => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  //컴포넌트가 마운트되고 나서 호출 특정작업
  useEffect(() => {
    if (users) return; // users가 이미 유효하다면 요청하지 않음
    dispatch(getUsers()); // 미들웨워 axios 비동기 데이터작업 호출
  }, [dispatch, users]); // 업데이트 일어날시 useEffect

  //572 PreloadContext 적용
  return (
    <>
      <Users users={users} />;
      <Preloader resolve={() => dispatch(getUsers)} />
    </>
  );
};

export default UsersContainer;
