import React from "react";
import { useNavigate } from "react-router-dom";
import ArticleService from "../services/article.service";

const PostArticleComponent = ({
  currentUser,
  title,
  setTitle,
  content,
  setContent,
  category,
  setCategory,
  image,
  setImage,
  message,
  setMessage,
}) => {
  const navigate = useNavigate();

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleChangeImg = (e) => {
    //預覽上傳的照片
    const output = document.getElementById("output");
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src);
    };
    //把img 資訊存在state
    setImage(e.target.files[0]);
  };
  //提交img到文章
  const handleImgToArticle = () => {
    ArticleService.postImgToArticle(currentUser.user._id, image)
      .then(() => {
        console.log("你成功在文章中加入圖片");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const postArticle = () => {
    ArticleService.post(title, content, category)
      .then(() => {
        if (image) {
          handleImgToArticle();
        }
        window.alert("你已經發表了新文章");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response);
        setMessage(err.response.data);
      });
  };

  return (
    <div className="postArticleBackground">
      {currentUser && (
        <div className="postArticleContainer">
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleChangeTitle}
            placeholder="標題"
          />

          <textarea
            name="content"
            id="content"
            cols="80"
            rows="10"
            onChange={handleChangeContent}
            placeholder="What's happening?"
          ></textarea>
          <br />

          <select
            name="category"
            id="category"
            type="text"
            onChange={handleChangeCategory}
            required="true"
          >
            <option value="">請選一個分類</option>
            <option>就醫經驗談</option>
            <option>身體有問題</option>
            <option>中西醫雜談</option>
          </select>
          <br />

          <div className="handleImgContainer">
            <div className="imgPreview">
              <img src="" id="output" alt="" />
            </div>
            <label htmlFor="handleImg" className="">
              上傳圖片
            </label>
            <input
              className="imageUpload"
              type="file"
              accept="image/gif,image/jpeg,image/png"
              onChange={handleChangeImg}
              id="handleImg"
              style={{ display: "none" }}
            />
          </div>

          <br />

          <button onClick={postArticle}>提交文章</button>
          <br />
          {message && <div>{message}</div>}
        </div>
      )}
    </div>
  );
};

export default PostArticleComponent;
