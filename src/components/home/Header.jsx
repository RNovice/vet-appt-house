import { Link } from "react-router-dom";
import textLogoSvg from "@/assets/images/text-logo.svg";
import heroDogPng from "@/assets/images/hero-dog.png";
const Header = () => {
  return (
    <header className="home-header hv100-with-nav bg-secondary d-flex align-items-end">
      <div className="d-flex flex-column gap-9 align-items-center mx-auto">
        <div className="d-flex flex-column gap-5 align-items-center">
          <div className="d-flex flex-column gap-4">
            <img className="logo" src={textLogoSvg} alt="預獸屋 Text Logo" />
            <p className="fs-5">專業醫療輕鬆預約，貼心守護毛孩健康</p>
          </div>
          <div className="d-flex gap-4">
            <Link to="/" className="btn-m btn-primary">
              搜尋醫院
            </Link>
            <Link to="/" className="btn-m btn-secondary d-flex">
              快速預約
              <span className="icon" style={{ width: "24px" }}>
                🐾
              </span>
            </Link>
          </div>
        </div>
        <img className="hero-image" src={heroDogPng} alt="Dog" />
      </div>
    </header>
  );
};

export default Header;
