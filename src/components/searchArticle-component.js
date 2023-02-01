import React from "react";
import { useNavigate } from "react-router-dom";
import ArticleService from "../services/article.service";

const searchArticleComponent = ({
  searchArticleData,
  setSearchArticleData,
  currentUser,
  say,
  setSay,
  nickname,
  setNickname,
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let navigate = useNavigate();

  const handleChangeMessage = (e) => {
    setSay(e.target.value);
  };
  const handleChangeNickname = (e) => {
    setNickname(e.target.value);
  };
  const handleArticleMessagePost = (e) => {
    if (say.length === 0) {
      window.alert("留言不能空白");
      navigate("/articles/search");
    } else {
      ArticleService.postArticleMessage(
        e.target.id,
        currentUser.user._id,
        say,
        nickname
      )
        .then(() => {
          window.alert("留言成功");
          messageReset();
          nicknameReset();
          setSay("");
          navigate("/articles/search");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function messageReset() {
    let messageInputs = document.querySelectorAll(".messageInput");
    let i;

    for (i = 0; i < messageInputs.length; i++) {
      messageInputs[i].value = "";
    }
  }
  function nicknameReset() {
    let nicknameInputs = document.querySelectorAll(".nicknameInput");
    let i;

    for (i = 0; i < nicknameInputs.length; i++) {
      nicknameInputs[i].value = "";
    }
  }
  //要把抓回來的img 轉成Base64
  function arrayBufferToBase64(buffer) {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  return (
    <div className="allArticleBackground">
      {!currentUser && <div>你比須先登入才能搜尋文章</div>}

      {currentUser && searchArticleData && searchArticleData.length !== 0 && (
        <div className="allArticleContainer">
          {searchArticleData.map((article) => (
            <div className="allArticle" id={article._id}>
              <p>
                {article.auther.username}&nbsp;&mdash;
                {article.auther._id}&mdash;&nbsp;
                {article.category}
              </p>
              <h2>{article.title}</h2>
              {article.image[0] && (
                <div className="myArticleImgContainer">
                  <img
                    src={`data:image/png;base64,${arrayBufferToBase64(
                      article.image[0].data.data
                    )}`}
                    alt=""
                  />
                </div>
              )}

              <p>{article.content}</p>
              <p className="allArticleTime">{article.date}</p>
              {article.message.map((messages) => (
                <div className="articleMessageContainer">
                  <p>{messages.nickname}</p>
                  <p> {messages.say}</p>

                  <p className="allArticleMessageTime">{messages.date}</p>
                </div>
              ))}

              <div className="articleMessagePostContainer">
                <textarea
                  onChange={handleChangeMessage}
                  placeholder="留點什麼......"
                  className="messageInput"
                ></textarea>
                <input
                  onChange={handleChangeNickname}
                  type="text"
                  placeholder="綽號"
                  className="nicknameInput"
                ></input>
                <button onClick={handleArticleMessagePost} id={article._id}>
                  送出留言
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default searchArticleComponent;
