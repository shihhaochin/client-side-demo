import React from "react";
import aboutUsImg from "../img/aboutUs.png";

const About = () => {
  return (
    <div className="aboutUsbg">
      <div className="aboutUsContainer">
        <div className="aboutUs-left">
          <ul>
            <li>網站作者：金時顥</li>
            <li>使用技術：react + nodej + mongodb</li>
            <li>經歷：日本株式会社サークル　レンタル部　技術課</li>
            <li>
              網站製作初衷：非本科系出生，在轉職的途中，友人建議要不要寫網頁，加上我很喜歡逛網站從而衍生出想寫自己的網站的想法。
            </li>
          </ul>
        </div>
        <div className="aboutUs-right">
          <div className="aboutUsImg">
            <img src={aboutUsImg} alt="" />
          </div>
          <div className="aboutUsImgBack">
            <ul>
              <li>電話：０９１６９５２５１６</li>
              <li>電子郵件：shihhao108@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
