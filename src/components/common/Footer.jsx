import React from "react";
import { Link } from "react-router-dom";
import logoSvg from "@/assets/images/logo.svg";
import sleepCatPng from "@/assets/images/sleepcat.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row footer-content">
          <div className="col d-flex flex-column justify-content-between">
            <Link className="brand" to="/">
              <img src={logoSvg} alt="預獸屋 Logo" />
              預獸屋
            </Link>
            <div className="copyright">Copyright © 2025 預獸屋</div>
          </div>
          <div className="col d-flex">
            <div className="row link-container">
              <div className="col list">
                <h5><Link className="link" to="/">快速預約</Link></h5>
              </div>
              <div className="col list">
                <h5>搜尋醫院</h5>
                <ul>
                  <li >
                    <Link className="link" to="/">精選醫院</Link>
                  </li>
                  <li >
                    <Link className="link" to="/">附近醫院</Link>
                  </li>
                </ul>
              </div>
              <div className="col list">
                <h5>所有消息</h5>
                <ul>
                  <li >
                    <Link className="link" to="/">最新消息</Link>
                  </li>
                  <li >
                    <Link className="link" to="/">活動消息</Link>
                  </li>
                  <li >
                    <Link className="link" to="/">熱門消息</Link>
                  </li>
                </ul>
              </div>
              <div className="col list">
                <h5>關於我們</h5>
                <ul>
                  <li >
                    <Link className="link" to="/">聯絡我們</Link>
                  </li>
                  <li >
                    <Link className="link" to="/">網站特色</Link>
                  </li>
                </ul>
              </div>
              <div className="col list">
                <h5>會員中心</h5>
                <ul>
                  <li >
                    <Link className="link" to="/">我的寵物</Link>
                  </li>
                  <li >
                    <Link className="link" to="/">我的預約</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img className="footer-decoration" src={sleepCatPng} />
    </footer>
  );
};

export default Footer;
