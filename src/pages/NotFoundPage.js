import React from "react";
import { Link } from "react-router-dom";
import errorImg from "../img/error.png";

const NotFoundPage = () => {
  return (
    <div className="notFoundPageContainer">
      <div className="notFoundPage">
        <h1>404</h1>
        <div className="errorImg">
          <img src={errorImg} alt="" />
        </div>
        <p>Opps! Page not found</p>
        <p>找不到網頁</p>

        <Link to="/">回到首頁</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
