import React, { useState } from "react";

const entranceCheckComponent = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let [entranceCheck, setEntranceCheck] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let [entranceJudge, setEntranceJudge] = useState(true);
  // eslint-disable-next-line no-undef
  const CheckCode = "asdfzxcv";
  const handleEntrance = (e) => {
    setEntranceCheck(e.target.value);
  };
  const judgeEntrance = () => {
    if (entranceCheck === CheckCode) {
      setEntranceJudge(false);
    }
  };

  return (
    <div className={entranceJudge ? "entranceCheckbg" : "entranceCheckClose"}>
      <div className="entranceCheckContainer">
        <p>網站施工中,請輸入網站認證碼</p>
        <p>詳細請看附件：網站作品集</p>

        <input type="text" onChange={handleEntrance} />
        <button onClick={judgeEntrance}>確定</button>
      </div>
    </div>
  );
};

export default entranceCheckComponent;
