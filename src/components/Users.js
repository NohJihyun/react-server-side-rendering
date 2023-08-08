//컴폰넌트폴더에 생성
//프레젠테이셔널컴포넌트
//UI만 담당
//redux-thunk
import { Link } from "react-router-dom";

//props로 받아서 처리
const Users = ({ users }) => {
  if (!users) return null; // users가 유효하지 않다면 아무것도 보여 주지 않음
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Users;
