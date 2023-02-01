import React from "react";
import { Link } from "react-router-dom";

const footerComponent = () => {
  return (
    <footer>
      <div className="information">
        <ul>
          <li>
            <Link to="/about">關於我們</Link>
          </li>
          <li>
            <Link to="/contact">聯絡我們</Link>
          </li>
        </ul>
      </div>
      <div className="trademark">ShihHao Chin 2023 ©</div>
    </footer>
  );
};

export default footerComponent;
