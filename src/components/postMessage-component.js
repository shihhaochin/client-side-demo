import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

const postMessageComponent = ({
  currentUser,
  say,
  setSay,
  nickname,
  setNickname,
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let [userId, setUserId] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let navigate = useNavigate();

  const handleUserId = (e) => {
    setUserId(e.target.value);
  };
  const handleMessage = (e) => {
    setSay(e.target.value);
  };
  const handleNickname = (e) => {
    setNickname(e.target.value);
  };
  const commitMessagePost = () => {
    authService
      .postMessageToUser(userId, currentUser.user._id, say, nickname)
      .then(() => {
        window.alert("訊息已送出，返回首頁");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="postMessageBackground">
      <div className="postMessageContainer">
        <input onChange={handleUserId} type="text" placeholder="對方用戶ID" />

        <textarea
          onChange={handleMessage}
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="訊息內容"
        ></textarea>

        <input onChange={handleNickname} type="text" placeholder="綽號" />
        <button onClick={commitMessagePost}>傳送訊息</button>
      </div>
    </div>
  );
};

export default postMessageComponent;
