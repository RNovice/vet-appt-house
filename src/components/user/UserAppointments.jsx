import { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide as Slide } from "swiper/react";
import { Mousewheel, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CardAppoint from "./CardAppoint";
import axios from "axios";

const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST;

const UserAppointments = () => {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [activeTab, setActiveTab] = useState("已預約"); // 新增狀態追蹤當前選中的標籤

  // 使用 useCallback 包裝 API 調用函數
  const fetchAppointments = useCallback(async () => {
    try {
      const url = `${BACKEND_HOST}/appointments?usersId=2&_expand=users&_expand=vetClinics&_expand=pets`;
      const res = await axios.get(url);
      console.log("API Response:", res.data);
      setAppointmentsData(res.data);
    } catch (error) {
      console.log("取得預約資料失敗");
    }
  }, []); // 空依賴陣列，因為這個函數不依賴任何外部變數

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]); // 依賴 fetchAppointments 函數

  // 處理標籤切換
  const handleTabClick = (status) => {
    setActiveTab(status);
  };

  // 根據當前選中的標籤篩選資料
  const filteredData = appointmentsData.filter(
    (item) => item.status === activeTab
  );

  return (
    <>
      <div className="userAppointments bg-cover">
        <div className="container">
          <div className="d-flex align-items-end justify-content-between mb-5">
            <div></div>
            <h3 className="section-title text-secondary">預約紀錄</h3>
            {appointmentsData && appointmentsData.length > 0 ? (
              <a className="fs-6 d-none d-lg-block" href="/">
                查看全部
              </a>
            ) : (
              ""
            )}
          </div>

          {appointmentsData && appointmentsData.length == 0 ? (
            <p className="text-center">目前沒有預約資料</p>
          ) : (
            <>
              <div className="row d-lg-none">
                <div className="col">
                  <div className="row g-3 mb-5">
                    <div className="col-12">
                      <h5 className="d-lg-none">即將到來</h5>
                    </div>
                    <div className="col">
                      <Swiper
                        modules={[Mousewheel]}
                        spaceBetween={16}
                        slidesPerView={"auto"}
                        mousewheel={true}
                      >
                        {appointmentsData
                          .filter((item) => item.status == "已預約")
                          .map((item) => (
                            <Slide key={item.id}>
                              <CardAppoint data={item} />
                            </Slide>
                          ))}
                      </Swiper>
                    </div>
                  </div>
                  <div className="row g-3 mb-5">
                    <div className="col-12">
                      <h5 className="d-lg-none">已到診</h5>
                    </div>
                    <div className="col">
                      <Swiper
                        modules={[Mousewheel]}
                        spaceBetween={16}
                        slidesPerView={"auto"}
                        mousewheel={true}
                      >
                        {appointmentsData
                          .filter((item) => item.status == "已到診")
                          .map((item) => (
                            <Slide key={item.id}>
                              <CardAppoint data={item} />
                            </Slide>
                          ))}
                      </Swiper>
                    </div>
                  </div>
                  <div className="row g-3 mb-5">
                    <div className="col-12">
                      <h5 className="d-lg-none">已取消</h5>
                    </div>
                    <div className="col">
                      <Swiper
                        modules={[Mousewheel]}
                        spaceBetween={16}
                        slidesPerView={"auto"}
                        mousewheel={true}
                      >
                        {appointmentsData
                          .filter((item) => item.status == "已取消")
                          .map((item) => (
                            <Slide key={item.id}>
                              <CardAppoint data={item} />
                            </Slide>
                          ))}
                      </Swiper>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-none d-lg-block">
                <ul className="appoint-tags d-flex mb-4">
                  <li>
                    <a
                      role="button"
                      className={`rounded-pill ${
                        activeTab === "已預約" ? "active" : ""
                      }`}
                      onClick={() => handleTabClick("已預約")}
                    >
                      即將到來
                    </a>
                  </li>
                  <li>
                    <a
                      role="button"
                      className={`rounded-pill ${
                        activeTab === "已到診" ? "active" : ""
                      }`}
                      onClick={() => handleTabClick("已到診")}
                    >
                      已到診
                    </a>
                  </li>
                  <li>
                    <a
                      role="button"
                      className={`rounded-pill ${
                        activeTab === "已取消" ? "active" : ""
                      }`}
                      onClick={() => handleTabClick("已取消")}
                    >
                      已取消
                    </a>
                  </li>
                </ul>
                <div className="row">
                  <div className="col">
                    <Swiper
                      modules={[Mousewheel]}
                      spaceBetween={16}
                      slidesPerView={"auto"}
                      mousewheel={true}
                    >
                      {filteredData.map((item) => (
                        <Slide key={item.id}>
                          <CardAppoint data={item} />
                        </Slide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>
              <div className="row mt-4 d-block d-lg-none">
                <div className="col-12 text-center">
                  <a className="fs-6 p-3" href="/">
                    查看全部
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserAppointments;
