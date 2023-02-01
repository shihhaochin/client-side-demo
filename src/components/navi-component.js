import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import searchIcon from "../img/searchIcon.png";

import AuthService from "../services/auth.service";
import { HashLink } from "react-router-hash-link";

const NaviComponent = ({
  search,
  setInput,
  currentUser,
  setCurrentUser,
  sidenaviChange,
  setSidenaviChange,
  setGoogleId,
  googleId,
  setSearchArticleData,
  allnavibarChange,
  setAllnavibarChange,
  setLoading,
}) => {
  const navigate = useNavigate();
  //在input改變的時候（輸入什麼東西的時候）把值存入setInput裏面
  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const handleLogout = () => {
    AuthService.logout();

    window.alert("成功登出，導向首頁！");
    setCurrentUser(AuthService.getCurrentUser());
    setSidenaviChange(true);
    setGoogleId("");
    navigate("/");
  };

  const changeSideNavibar = () => {
    if (sidenaviChange) {
      setSidenaviChange(false);
    } else {
      setSidenaviChange(true);
    }
  };
  let [userbarChange, setUserChange] = useState(false);
  const changeUserbar = () => {
    if (userbarChange) {
      setUserChange(false);
    } else {
      setUserChange(true);
    }
  };

  const resetSearchArticle = () => {
    setSearchArticleData(null);
    setLoading(true);
    navigate("/articles");
    setSidenaviChange(false);
  };

  return (
    <header>
      <div
        className={allnavibarChange ? "navi-container" : "navi-containerChange"}
      >
        <div className={allnavibarChange ? "nav-left" : "nav-leftChange"}>
          <div onClick={changeSideNavibar} className="naviicon">
            <div></div>
          </div>

          <h1>Healthy BBS </h1>

          <p>~健康大小事~</p>
          <div className="search">
            <div
              className={allnavibarChange ? "searchIcon" : "searchIconChange"}
            >
              <img src={searchIcon} alt="" />
            </div>
            <input onChange={inputHandler} type="text" className="text-black" />
            <button onClick={search}>
              <HashLink to="#secondImg" href="#secondImg">
                新聞搜尋
              </HashLink>
            </button>
          </div>
        </div>
        <div className={allnavibarChange ? "nav-right" : "nav-rightChange"}>
          <ul>
            <li>
              <Link to="/">首頁</Link>
            </li>
            {!currentUser && (
              <li>
                <Link to="/register">註冊</Link>
              </li>
            )}
            {!currentUser && (
              <li>
                <Link to="/login">登入</Link>
              </li>
            )}
            {currentUser && !currentUser.user.googleID && (
              <li>
                <div onClick={handleLogout}>登出</div>
              </li>
            )}

            {currentUser && (
              <li onClick={changeUserbar}>{currentUser.user.username}</li>
            )}
          </ul>
        </div>
      </div>
      <div className={allnavibarChange ? "allSidenavi" : "allSidenaviChange"}>
        <div className={sidenaviChange ? "sidenavi" : "sidenaviClose"}>
          <ul>
            <li>
              <Link to="/articles" onClick={resetSearchArticle}>
                所有文章
              </Link>
            </li>
            <li>
              <Link
                to="/articles/experience"
                onClick={() => {
                  setLoading(true);
                  setSidenaviChange(false);
                }}
              >
                就醫經驗談
              </Link>
            </li>
            <li>
              <Link
                to="/articles/bodyquestion"
                onClick={() => {
                  setLoading(true);
                  setSidenaviChange(false);
                }}
              >
                身體有問題
              </Link>
            </li>
            <li>
              <Link
                to="/articles/medicaltalk"
                onClick={() => {
                  setLoading(true);
                  setSidenaviChange(false);
                }}
              >
                中西醫雜談
              </Link>
            </li>

            <li>
              <Link
                to="/video"
                onClick={() => {
                  setSidenaviChange(false);
                }}
              >
                影片專區
              </Link>
            </li>
            <li>
              <Link
                to="/user/message"
                onClick={() => {
                  setSidenaviChange(false);
                }}
              >
                想傳私訊
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {currentUser && (
        <div className={allnavibarChange ? "allUserbar" : "allUserbarChange"}>
          <div className={userbarChange ? "userbar" : "userbarClose"}>
            <ul>
              <li>
                <Link
                  to="/profile"
                  onClick={() => {
                    setUserChange(false);
                  }}
                >
                  個人檔案
                </Link>
              </li>

              <li>
                <Link
                  to="/profile/message"
                  onClick={() => {
                    setUserChange(false);
                  }}
                >
                  我的訊息
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/article"
                  onClick={() => {
                    setLoading(true);
                    setUserChange(false);
                  }}
                >
                  我的文章
                </Link>
              </li>
            </ul>
            <svg
              className="oneLine"
              width="242"
              height="765"
              viewBox="0 0 242 765"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M169 2C180.073 2 191.438 10.9212 192 22.4444C192.422 31.0971 194.55 40.0697 191.444 48.5C188.566 56.3129 181.164 60.271 174.556 64.4444C154.468 77.1314 122.993 70 100.556 70C84.1601 70 69.2133 71.6144 53.6667 77.3889C45.4645 80.4354 40.495 84.0101 33.2222 89.2222C25.9249 94.452 18.5104 99.1765 13.1111 106.556C-0.123589 124.643 -1.94864 146.711 7.66666 166.778C14.7164 181.49 27.2684 196.308 42.7222 202.556C94.99 223.685 147.948 200.592 200.444 194.611C210.222 193.497 223.532 191.139 230.556 199.111C243.218 213.485 241.655 241.197 235.167 257.778C215.563 307.875 162.16 336 110.333 336C90.0776 336 68.2054 333.909 48.1111 337C37.9241 338.567 31.1495 349.535 26.8889 357.889C18.4324 374.47 22.7803 394.722 32.6667 409.222C38.694 418.062 45.0599 425.438 52.8889 432.778C64.236 443.416 80.5434 447.732 95.1111 452.111C108.029 455.994 122.842 458.803 136.333 459C150.494 459.207 165.777 460.575 179.722 457.444C184.584 456.353 212.778 457 207.556 446.556C203.285 438.014 187.233 438.345 179.611 439.5C155.637 443.132 137.157 464.761 130.611 487.167C125.524 504.579 129.706 527.151 130.444 544.778C131.24 563.764 131.513 582.879 129.222 601.778C128.85 604.851 124.306 635.49 116.5 623C113.03 617.448 112.838 608.632 113.056 602.222C113.412 591.702 116.944 587.08 123.889 579.333C127.776 574.997 131.138 571.758 136.667 569.667C141.929 567.676 152.597 562.957 158.167 565.278C166.92 568.925 172.126 582.716 175.278 590.556C182.636 608.856 182.504 627.739 180.222 647C178.729 659.602 178.492 672.42 175.444 684.778C173.507 692.636 170 700.255 170 708.444C170 721.19 166.277 733.797 166 746.556C165.914 750.512 162.841 761.28 168 763"
                stroke="#0C5F5F"
                stroke-width="3"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </div>
      )}
    </header>
  );
};

export default NaviComponent;
