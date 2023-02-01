import React, { useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import downArrowImg from "../img/downArrow.png";
import upArrowImg from "../img/up-arrow.png";
import NewsComponent from "../components/news-component";

import uuid from "react-uuid";

const Homepage = (props) => {
  const { data, moreNews, setSidenaviChange, allnavibarChange } = props;
  useEffect(() => {
    setSidenaviChange(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //因為fetch到的資料一開始是null所以map不會作用前面要加data && 這樣前面後面就不會執行
  //要記得每一個chirdren都要有key 而且要記得加在最上層
  return (
    <main>
      <div className="homepageImg" id="homepageImg">
        <div className="homepageImgContent">
          <h1>Healthy BBS</h1>
          <p>~讓我們來討論身體健康的大小事~</p>
          <button>
            <span></span>
            <HashLink to="#secondImg" href="#secondImg">
              WATCH NEWS
            </HashLink>
          </button>
          <div className="downArrowImg">
            <img src={downArrowImg} alt="down-Arrow" />
          </div>
        </div>
      </div>

      <div className="secondImg" id="secondImg">
        <div className="article">
          {data &&
            data.map((d) => {
              return <NewsComponent data={d} key={uuid()} />;
            })}
        </div>

        <div className="moreNews">
          <button onClick={moreNews}>更多新聞</button>
        </div>
      </div>

      <div className={allnavibarChange ? "upArrow" : "upArrowExit"}>
        <HashLink to="#homepageImg">
          <img src={upArrowImg} alt="" />
        </HashLink>
      </div>
    </main>
  );
};

export default Homepage;
