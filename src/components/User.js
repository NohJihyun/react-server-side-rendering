//581 redux-saga
//상위에는 유효성 검사를 해주었는데, 지금 로직은 유효성 검사를 따로 하지 않았다
//581 유효성 검사를 컨테이너컴포넌트에서 적용시킨다
const User = ({ user }) => {
  const { email, name, username } = user;
  return (
    <div>
      <h1>
        {username} ({name})
      </h1>
      <p>
        <b>e-mail:</b>
        {email}
      </p>
    </div>
  );
};

export default User;
