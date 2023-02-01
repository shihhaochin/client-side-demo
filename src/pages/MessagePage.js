import React, { useEffect, useState } from "react";

const MessagePage = ({ currentUser }) => {
  let [messageData, setMessageData] = useState(null);

  useEffect(() => {
    if (currentUser.user.message.length !== 0) {
      let newMessageData = currentUser.user.message;
      let newMessageDataCopy = [...newMessageData];
      newMessageDataCopy.reverse();
      console.log(newMessageDataCopy);
      setMessageData(newMessageDataCopy);
    }
  }, [currentUser.user.message, messageData]);

  return (
    <div className="myMessageBackground">
      {messageData === null && (
        <div className="notMessage">目前沒有訊息!!!</div>
      )}
      {currentUser &&
        messageData &&
        messageData.map((message) => (
          <div className="myMessageContainer">
            <p>
              {message.nickname}&mdash;
              {message.otherUserID}&mdash;
            </p>
            <p>{message.say}</p>
            <p>{message.date}</p>
          </div>
        ))}
    </div>
  );
};
export default MessagePage;
