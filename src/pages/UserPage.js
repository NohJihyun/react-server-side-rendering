//583 useParams Hook을 통해 URL파라미터를 조회하고 id 파라미터를 UserContainer에게 props로 넣어주도록 구현해주었습니다
import { useParams } from "react-router-dom";
// 컨테이너컴포넌트를 보여줄 단순 페이지 컴포넌트를 만들고 라우트 설정
import UserContainer from "../containers/UserContainer";

const UserPage = () => {
  const { id } = useParams();
  return <UserContainer id={id} />;
};

export default UserPage;
