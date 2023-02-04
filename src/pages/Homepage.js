import React, { useEffect } from "react";
import downArrowImg from "../img/downArrow.png";
import { useNavigate } from "react-router-dom";

const Homepage = (props) => {
  const { setSidenaviChange } = props;
  useEffect(() => {
    setSidenaviChange(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navigate = useNavigate();

  //因為fetch到的資料一開始是null所以map不會作用前面要加data && 這樣前面後面就不會執行
  //要記得每一個chirdren都要有key 而且要記得加在最上層
  return (
    <main>
      <div className="homepageImg" id="homepageImg">
        <div className="homepageImgContent">
          <h1>Healthy BBS</h1>
          <p>~讓我們來討論身體健康的大小事~</p>
          <button
            onClick={() => {
              navigate("/articles");
            }}
          >
            <span></span>
            WATCH ARTICLES
          </button>
          <div className="downArrowImg">
            <img src={downArrowImg} alt="down-Arrow" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Homepage;
