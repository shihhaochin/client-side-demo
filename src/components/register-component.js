import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const registerComponent = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [username, setUsername] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [email, setEmail] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [password, setPassword] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [pwdAgain, setPwdAgain] = useState("");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [message, setMessage] = useState("");
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handlePwdAgain = (e) => {
    setPwdAgain(e.target.value);
  };
  const handleRegister = () => {
    if (password === pwdAgain) {
      AuthService.register(username, email, password)
        .then(() => {
          window.alert("已經註冊成功！！！導向登入頁面");
          navigate("/login");
        })
        .catch((err) => {
          console.log(err.response);
          setMessage(err.response.data);
        });
    } else {
      window.alert("請再確認您所輸入的密碼是否相同");
    }
  };

  return (
    <div className="loginImg">
      <div className="h-screen flex justify-center flex-col items-center pt-16 ">
        {message && <div className="bg-red-300 py-5 px-20">{message}</div>}
        <section className="shadow-2xl shadow-cyan-700 mt-8 flex flex-col justify-around w-96 h-2/3 border border-slate-8000 bg-cyan-700/75  border-slate-800 items-center  text-white rounded-3xl  ">
          <h1 className="text-3xl mt-3">建立帳戶</h1>
          <div className="h-3/4 flex flex-col justify-around items-center">
            <div>
              <input
                onChange={handleChangeUsername}
                type="'text'"
                className="block  w-80 h-10  border-b-2 outline-0 text-2xl bg-cyan-900 rounded-md  "
                placeholder="您的姓名"
              />
            </div>
            <div>
              <input
                onChange={handleChangeEmail}
                type="text"
                className="block   w-80 h-10  border-b-2 outline-0 text-2xl  bg-cyan-900 rounded-md "
                placeholder="電子信箱"
              />
            </div>
            <div>
              <input
                onChange={handleChangePassword}
                type="password"
                className="block  w-80 h-10  border-b-2 outline-0 text-2xl  bg-cyan-900 rounded-md "
                placeholder="密碼"
              />
            </div>
            <div>
              <input
                onChange={handlePwdAgain}
                type="password"
                className="block  w-80 h-10  border-b-2 outline-0 text-2xl  bg-cyan-900 rounded-md "
                placeholder="重新輸入密碼"
              />
            </div>
            <button
              className=" text-2xl py-2 px-24 rounded-full bg-cyan-400/75 text-blue-900 hover:-translate-y-1 "
              onClick={handleRegister}
            >
              註冊
            </button>
          </div>
          <p>
            已經有帳戶？{" "}
            <Link to="/login">
              <button className="hover:scale-110">登入頁面</button>
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default registerComponent;
