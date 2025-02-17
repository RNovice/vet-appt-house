import { Swiper, SwiperSlide as Slide } from "swiper/react";
import { Mousewheel, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CardAppoint from "./CardAppoint";

const UserAppointments = () => {
  const datas = [
    {
      id: 1,
      petName: "強哥",
      appointmentTime: "2024-12-24 11:00-12:00AM",
      status: "已預約",
      vetClinicName: "春風動物醫院",
    },
    {
      id: 2,
      petName: "一姊",
      appointmentTime: "2024-12-13 15:00-16:00PM",
      status: "已預約",
      vetClinicName: "吱吱動物醫院",
    },
    {
      id: 3,
      petName: "一姊",
      appointmentTime: "2024-12-13 15:00-16:00PM",
      status: "已預約",
      vetClinicName: "吱吱動物醫院",
    },
    {
      id: 4,
      petName: "一姊",
      appointmentTime: "2024-12-13 15:00-16:00PM",
      status: "已到診",
      vetClinicName: "吱吱動物醫院",
    },
    {
      id: 5,
      petName: "強哥",
      appointmentTime: "2024-12-24 11:00-12:00AM",
      status: "已到診",
      vetClinicName: "春風動物醫院",
    },
    {
      id: 6,
      petName: "一姊",
      appointmentTime: "2024-12-13 15:00-16:00PM",
      status: "已到診",
      vetClinicName: "吱吱動物醫院",
    },
    {
      id: 7,
      petName: "一姊",
      appointmentTime: "2024-12-13 15:00-16:00PM",
      status: "已取消",
      vetClinicName: "吱吱動物醫院",
    },
    {
      id: 8,
      petName: "一姊",
      appointmentTime: "2024-12-13 15:00-16:00PM",
      status: "已取消",
      vetClinicName: "吱吱動物醫院",
    },
    {
      id: 9,
      petName: "一姊",
      appointmentTime: "2024-12-13 15:00-16:00PM",
      status: "已取消",
      vetClinicName: "吱吱動物醫院",
    },
  ];

  return (
    <>
      <div className="userAppointments bg-cover">
        <div className="container">
          <div className="d-flex align-items-end justify-content-between mb-5">
            <div></div>
            <h3 className="section-title text-secondary">預約紀錄</h3>
            {datas && datas.length > 0 ? (
              <a className="fs-6 d-none d-lg-block" href="/">
                查看全部
              </a>
            ) : (
              ""
            )}
          </div>

          {datas && datas.length == 0 ? (
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
                        {datas
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
                        {datas
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
                        {datas
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
                    <a role="button" className="rounded-pill active">
                      即將到來
                    </a>
                  </li>
                  <li>
                    <a role="button" className="rounded-pill">
                      已到診
                    </a>
                  </li>
                  <li>
                    <a role="button" className="rounded-pill">
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
                      {datas.map((item) => (
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
