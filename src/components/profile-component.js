import React from "react";

const profileComponent = ({ currentUser }) => {
  return (
    <div className="profileBackground">
      {!currentUser && (
        <div style={{ padding: "5rem 15rem", fontSize: "2rem" }}>
          你必須先登入才能看你的個人頁面
        </div>
      )}
      {currentUser && (
        <div className="profileContainer">
          <p>姓名:&nbsp;&nbsp;{currentUser.user.username}</p>

          <p> ID:&nbsp;&nbsp;{currentUser.user._id}</p>
          <p>Email:&nbsp;&nbsp;{currentUser.user.email}</p>
        </div>
      )}
    </div>
  );
};

export default profileComponent;
