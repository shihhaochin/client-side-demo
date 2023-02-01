import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import PostArticleComponent from "../components/postArticle-component";
import messageHide from "../img/messageOpen.png";
import upArrow from "../img/up-arrow.png";
import loadingImg from "../img/loading.png";
import articleDeleteImg from "../img/close.png";
import articleEditImg from "../img/gear.png";
import ArticleService from "../services/article.service";

const MyArticleComponent = ({
  currentUser,
  say,
  setSay,
  nickname,
  setNickname,
  messageClose,
  setMessageClose,
  allnavibarChange,
  loading,
  setLoading,
}) => {
  let navigate = useNavigate();
  let [articleData, setArticleData] = useState(null);
  let [articleEdit, setArticleEdit] = useState(true);
  let [editCheck, setEditCheck] = useState(true);
  let [targetId, setTargetId] = useState("");
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  let [category, setCategory] = useState("");
  let [image, setImage] = useState(null);
  let [message, setMessage] = useState("");

  function handleChangeMessage(e) {
    setSay(e.target.value);
    setNickname(currentUser.user.username);
  }

  const handleArticleMessagePost = (e) => {
    if (say.length === 0) {
      window.alert("留言不能空白");
      navigate("/profile/article");
    } else {
      ArticleService.postArticleMessage(
        e.target.id,
        currentUser.user._id,
        say,
        nickname
      )
        .then(() => {
          window.alert("你已經回覆");
          messageReset();
          nicknameReset();
          setMessageClose(true);
          setSay("");
          navigate("/profile/article");
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
  function handleArticleDelete() {
    ArticleService.delete(targetId)
      .then(() => {
        window.alert("文章已經刪除");
        navigate("/profile/article");
        setEditCheck(true);
        setTargetId("");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleArticleEditCheck(e) {
    setEditCheck(false);
    setTargetId(e.target.id);
    ArticleService.getArticle(e.target.id)
      .then((data) => {
        setTitle(data.data.title);
        setContent(data.data.content);
        setCategory(data.data.category);
        setImage(data.data.image[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }
  function handleChangeContent(e) {
    setContent(e.target.value);
  }
  function handleChangeCategory(e) {
    setCategory(e.target.value);
  }
  function handleChangeImg(e) {
    //預覽上傳的照片
    const outputAgain = document.getElementById("outputAgain");
    outputAgain.src = URL.createObjectURL(e.target.files[0]);
    outputAgain.onload = function () {
      URL.revokeObjectURL(outputAgain.src);
    };
    //把img 資訊存在state
    setImage(e.target.files[0]);
  }
  //修改img到文章
  const handleEditImgToArticle = () => {
    ArticleService.editImgToArticle(targetId, image)
      .then(() => {
        console.log("你成功修改圖片");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const postEditArticle = () => {
    ArticleService.edit(targetId, title, content, category)
      .then(() => {
        if (image) {
          handleEditImgToArticle();
        }
        window.alert("你已經修改了文章");
        navigate("/");
        setArticleEdit(true);
        setEditCheck(true);
        setTargetId("");
        setTitle("");
        setContent("");
        setCategory("");
        setImage(null);
        setTargetId("");
      })
      .catch((err) => {
        console.log(err.response);
        setMessage(err.response.data);
      });
  };

  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
    } else {
      _id = "";
    }

    ArticleService.get(_id)
      .then((data) => {
        if (data.data.length !== 0) {
          setTimeout(() => {
            setLoading(false);
          }, 500);
          setArticleData(data.data);
        } else {
          setArticleData(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [articleData, currentUser, setLoading]);

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
      {!currentUser && (
        <div className="notUserPage">你比須先登入才能看你的文章</div>
      )}
      <div>
        <PostArticleComponent
          currentUser={currentUser}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          category={category}
          setCategory={setCategory}
          image={image}
          setImage={setImage}
          message={message}
          setMessage={setMessage}
        />
      </div>

      {currentUser && loading === true && (
        <div className="loadingImgContainer">
          <img src={loadingImg} alt="" />
        </div>
      )}
      {articleData === null && (
        <div className="text-center mt-12 text-lg ">還沒發表任何文章!!!</div>
      )}

      {editCheck === false && (
        <div className="editCheckContainer">
          <div className="editCheckBackground">
            <div
              className="myArticleDelete"
              onClick={() => {
                setEditCheck(true);
              }}
            >
              <img src={articleDeleteImg} alt="" />
            </div>
            <div>
              <button
                onClick={() => {
                  setArticleEdit(false);
                  setEditCheck(true);
                }}
              >
                編輯文章
              </button>

              <button onClick={handleArticleDelete}>刪除文章</button>
            </div>
          </div>
        </div>
      )}
      {articleEdit === false && (
        <div className="articleEditBackground">
          <div className="articleEditCloseImg">
            <img
              onClick={() => {
                setArticleEdit(true);
                setTitle("");
                setContent("");
                setCategory("");
                setImage(null);
              }}
              src={articleDeleteImg}
              alt=""
            />
          </div>
          <div className="articleEditContainer">
            <div className="articleEdit">
              <input
                name="title"
                type="text"
                id="title"
                onChange={handleChangeTitle}
                placeholder="標題"
                value={title}
              />

              <textarea
                name="content"
                id="content"
                cols="80"
                rows="10"
                onChange={handleChangeContent}
                placeholder="What's happening?"
                value={content}
              ></textarea>
              <br />

              <select
                name="category"
                id="category"
                type="text"
                onChange={handleChangeCategory}
                required="true"
                value={category}
              >
                <option value="">請選一個分類</option>
                <option>就醫經驗談</option>
                <option>身體有問題</option>
                <option>中西醫雜談</option>
              </select>
              <br />

              <div className="handleImgContainer">
                <div className="imgPreview">
                  <img src="" id="outputAgain" alt="" />
                </div>
                <label htmlFor="handleImgAgain" className="">
                  修改上傳圖片
                </label>
                <input
                  className="imageUpload"
                  type="file"
                  accept="image/gif,image/jpeg,image/png"
                  onChange={handleChangeImg}
                  id="handleImgAgain"
                  style={{ display: "none" }}
                />
              </div>

              <br />

              <button onClick={postEditArticle}>提交修改文章</button>
              <br />
              {message && <div>{message}</div>}
            </div>
          </div>
        </div>
      )}

      {currentUser &&
        articleData &&
        loading === false &&
        articleData.length !== 0 && (
          <div className="allArticleContainer">
            {articleData.map((article) => (
              <div className="allArticle" id={article._id}>
                <div className="myArticleEdit" onClick={handleArticleEditCheck}>
                  <img src={articleEditImg} alt="" id={article._id} />
                </div>

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
                    type="text"
                    className="nicknameInput"
                    value={currentUser.user.username}
                  ></input>
                  <button onClick={handleArticleMessagePost} id={article._id}>
                    回覆留言
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

export default MyArticleComponent;
