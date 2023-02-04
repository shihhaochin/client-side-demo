import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import messageHide from "../img/messageOpen.png";
import upArrow from "../img/up-arrow.png";
import loadingImg from "../img/loading.png";
import articleService from "../services/article.service";

const ArticlePage = ({
  currentUser,
  say,
  setSay,
  nickname,
  setNickname,
  messageClose,
  setMessageClose,
  allnavibarChange,
  searchArticleData,
  setSearchArticleData,
  loading,
  setLoading,
}) => {
  let navigate = useNavigate();
  let [allArticleData, setAllArticleData] = useState(null);

  const handleChangeMessage = (e) => {
    setSay(e.target.value);
  };
  const handleChangeNickname = (e) => {
    setNickname(e.target.value);
  };
  const handleArticleMessagePost = (e) => {
    if (say.length === 0) {
      window.alert("留言不能空白");
      navigate("/articles");
    } else {
      articleService
        .postArticleMessage(e.target.id, currentUser.user._id, say, nickname)
        .then(() => {
          window.alert("你已經留言");
          setMessageClose(true);
          messageReset();
          nicknameReset();
          setSay("");
          navigate("/articles");
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
  function handleMessageClose() {
    if (messageClose) {
      setMessageClose(false);
    } else {
      setMessageClose(true);
    }
  }

  useEffect(() => {
    if (searchArticleData) {
      setAllArticleData(searchArticleData);
    } else {
      articleService
        .getAllArticle()
        .then((data) => {
          setTimeout(() => {
            setLoading(false);
          }, 500);
          setAllArticleData(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [allArticleData, searchArticleData, setLoading]);

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
    <div className="allArticleBackground" id="allArticleBackground">
      {!currentUser && <div className="notUserPage">你比須先登入!</div>}

      {currentUser && loading === true && (
        <div className="loadingImgContainer">
          <img src={loadingImg} alt="" />
        </div>
      )}

      {currentUser &&
        allArticleData &&
        allArticleData !== 0 &&
        loading === false && (
          <div className="allArticleContainer">
            {allArticleData.map((article) => (
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

                {article.message.length !== 0 && (
                  <div
                    onClick={handleMessageClose}
                    className="messageHandleContainer"
                  >
                    <p>留言</p>
                    <div className="messageHandleImgContainer">
                      <img
                        className={
                          messageClose
                            ? "messageHandleImg"
                            : "messageHandleImgClose"
                        }
                        src={messageHide}
                        alt=""
                      />
                    </div>
                  </div>
                )}

                {article.message.map((messages) => (
                  <div
                    className={
                      messageClose
                        ? "articleMessageContainer"
                        : "articleMessageContainerClose"
                    }
                  >
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

      <div className={allnavibarChange ? "upArrow" : "upArrowExit"}>
        <HashLink to="#allArticleBackground">
          <img src={upArrow} alt="" />
        </HashLink>
      </div>
    </div>
  );
};

export default ArticlePage;
