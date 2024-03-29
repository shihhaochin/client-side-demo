import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const loginComponent = ({
  currentUser,
  setCurrentUser,
  googleId,
  setGoogleId,
  setWaitlogin,
  waitlogin,
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [email, setEmail] = useState("");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [password, setPassword] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [message, setMessage] = useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = () => {
    setWaitlogin(true);

    AuthService.login(email, password)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        setCurrentUser(AuthService.getCurrentUser());
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data);
        setWaitlogin(false);
      });
  };

  return (
    <div className="loginImg">
      <div className="h-screen flex justify-center flex-col items-center pt-14  ">
        {message && <div className="bg-red-300 py-5 px-20">{message}</div>}
        <section className="relative shadow-2xl shadow-cyan-700 mt-8 flex flex-col justify-around w-96 h-1/2 border bg-cyan-700/75 border-slate-800 items-center text-white rounded-3xl  ">
          <h1 className="text-3xl mt-3">登入</h1>
          <div className="h-3/4 flex flex-col justify-around items-center">
            <div>
              <input
                onChange={handleChangeEmail}
                type="text"
                className="block w-80 h-10  border-b-2 outline-0 text-2xl  bg-cyan-900 rounded-md "
                placeholder="電子郵件"
              />
            </div>
            <div>
              <input
                onChange={handleChangePassword}
                type="password"
                className="block w-80 h-10  border-b-2 outline-0 text-2xl  bg-cyan-900 rounded-md"
                placeholder="密碼"
              />
            </div>

            <button
              className=" text-2xl py-2 px-24 rounded-full bg-cyan-400 text-blue-900 hover:-translate-y-1 "
              onClick={handleLogin}
            >
              繼續
            </button>
            <div
              className={
                waitlogin ? "waitLoginLoading" : "waitLoginLoadingClose"
              }
            >
              <div className="waitLoginLoadingbg">
                <p>登</p>
                <p>入</p>
                <p>中</p>
                <p>.</p>
                <p>.</p>
                <p>.</p>
              </div>
            </div>
          </div>
          <p>
            還沒註冊？
            <Link to="/register">
              <button className="hover:scale-110">註冊頁面</button>
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default loginComponent;
