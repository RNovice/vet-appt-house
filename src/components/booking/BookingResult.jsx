import { Link } from "react-router-dom";

const BookingResult = ({ result, reset }) => {
  return result.id ? (
    <div className="booking-result d-flex justify-content-center align-items-center position-fixed">
      <div className="result-modal p-3">
        <h3>預約成功!</h3>
        <p className="fs-5 mt-2">預約已確認，請查看以下資訊：</p>
        <p className="fs-6 mt-1 text-tertiary">
          預約編號: {Date.now().toString().slice(3, -4)}0
          {result?.id}
        </p>
        <p className="fs-6 mt-1 text-tertiary">
          預約日期: {result?.appointmentDateTime}
        </p>
        <div className="d-flex justify-content-around mt-3">
          <Link className="action fs-6 btn-quaternary" to="/">
            返回首頁
          </Link>
          <button
            className="action fs-6 btn-outline-quaternary"
            onClick={reset}
          >
            繼續預約
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default BookingResult;
