import React from "react";

const newsComponent = ({ data }) => {
  return (
    <div className="news">
      <h1>{data.title}</h1>
      <div className="imageContainer">
        <img src={data.urlToImage} alt="" />
      </div>
      <p>{data.description}</p>
      <p>作者:&nbsp;&nbsp;{data.author}</p>
      <p>
        出處:&nbsp;&nbsp;{data.source.name}&nbsp;&nbsp;&nbsp;
        <a target="_blank" href={data.url} rel="noreferrer">
          詳細內容......
        </a>
      </p>
    </div>
  );
};

export default newsComponent;
