//這個檔案是寫方法幫我們把資料（http request）送到server

import axios from "axios";
const API_URL = "https://jade-dugong-tutu.cyclic.app/api/user";

//寫一個AuthService object 裡面放入一些方法 如 get post 等
class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/login", {
      email,
      password,
    });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
    });
  }
  registerAndLogin(email, googleId, imageUrl, googleName) {
    return axios.post(API_URL + "/google", {
      email,
      googleId,
      imageUrl,
      googleName,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  getCurrentUserData(userId) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/" + userId, {
      headers: {
        Authorization: token,
      },
    });
  }

  postMessageToUser(_id, otherUserID, say, nickname) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL + "/message/" + _id,
      {
        otherUserID,
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
}

export default new AuthService();
