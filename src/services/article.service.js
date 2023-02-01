import axios from "axios";
const API_URL = "https://jade-dugong-tutu.cyclic.app/api/articles";

class ArticleService {
  post(title, content, category) {
    //把文章送過去之前要把token 打包一起送過去
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL,
      { title, content, category },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  //上傳圖片
  postImg(image) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    //把image 包成後端懂得狀態
    const formData = new FormData();

    formData.append("image", image);

    return axios.post(API_URL + "/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    });
  }

  //用作者id去找資料
  get(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/auther/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
  //用文章id去找文章
  getArticle(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
  getAllArticle() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL, {
      headers: {
        Authorization: token,
      },
    });
  }
  getExperienceArticle() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/experience", {
      headers: {
        Authorization: token,
      },
    });
  }
  getBodyQuestionArticle() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/bodyquestion", {
      headers: {
        Authorization: token,
      },
    });
  }
  getMedicalTalkArticle() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/medicaltalk", {
      headers: {
        Authorization: token,
      },
    });
  }
  getSearchArticle(keyword) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/search/" + keyword, {
      headers: {
        Authorization: token,
      },
    });
  }
  postImgToArticle(_id, image) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    //把image 包成後端懂得狀態
    const formData = new FormData();
    formData.append("image", image);

    return axios.post(API_URL + "/upload/" + _id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    });
  }
  postArticleMessage(_id, speakerID, say, nickname) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL + "/message/" + _id,
      {
        speakerID,
        say,
        nickname,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  //用文章id 去找文章然後修改
  edit(_id, title, content, category) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.patch(
      API_URL + "/" + _id,
      { title, content, category },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  //修改文章圖片
  editImgToArticle(_id, image) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    //把image 包成後端懂得狀態
    const formData = new FormData();
    formData.append("image", image);

    return axios.patch(API_URL + "/upload/" + _id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    });
  }
  //用文章id去找文章,然後刪掉
  delete(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.delete(API_URL + "/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new ArticleService();
