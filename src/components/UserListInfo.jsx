import "./UserListInfo.css";

function UserInfo({ name, email }) {
  return (
    <>
      <div className="user-container">
        <p>
          <span>Name: </span> <span className="info-text">{name}</span>.
        </p>

        <p>
          <span>Email:</span> <span className="info-text">{email}</span>
        </p>
      </div>
    </>
  );
}

export default UserInfo;
