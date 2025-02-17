import { Swiper, SwiperSlide as Slide } from "swiper/react";
import { Mousewheel, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Icon from "../common/Icon";

import pet1 from "@/assets/images/user/pet-1.png";
import pet2 from "@/assets/images/user/pet-2.png";
import pet3 from "@/assets/images/user/pet-3.png";
import pet4 from "@/assets/images/user/pet-4.png";

const UserPets = () => {
  const datas = [
    {
      id: 1,
      name: "一姊",
      age: "3個月",
      gender: "female",
      image: pet1,
    },
    {
      id: 2,
      name: "波妞",
      age: "4歲",
      gender: "female",
      image: pet2,
    },
    {
      id: 3,
      name: "寶寶",
      age: "1個月",
      gender: "female",
      image: pet3,
    },
    {
      id: 4,
      name: "強哥",
      age: "10歲",
      gender: "male",
      image: pet4,
    },
  ];

  return (
    <>
      <div className="userPrts bg-cover">
        <div className="container">
          <div className="d-flex align-items-end justify-content-between mb-5">
            <div></div>
            <h3 className="section-title text-secondary">我的寵物</h3>
            {datas && datas.length > 0 ? (
              <a className="fs-6 d-none d-lg-block" href="/">
                查看全部
              </a>
            ) : (
              ""
            )}
          </div>
          {/*  */}
          {datas && datas.length == 0 ? (
            <a role="button">
              <div className="card p-3 rounded-4 border-0">
                <div className="card-body align-items-lg-center justify-content-lg-center d-lg-flex p-0 text-center">
                  <div className="align-items-center justify-content-center d-flex ">
                    <Icon fileName={"add-circle"} size={24} />
                    <span className="ms-4">新增寵物</span>
                  </div>
                </div>
              </div>
            </a>
          ) : (
            <>
              <div className="row g-3">
                <div className="col-12 col-lg-1 order-1">
                  {/* 新增寵物按鈕 start */}
                  <a role="button">
                    <div className="add-pet card p-3 rounded-4 border-0 h-100">
                      <div className="card-body align-items-lg-center justify-content-lg-center d-lg-flex p-0 text-center">
                        <span className="align-items-center justify-content-center d-flex ">
                          <Icon fileName={"add-circle"} size={24} />
                          <span className="ms-4 ms-lg-0 mt-lg-4">新增寵物</span>
                        </span>
                      </div>
                    </div>
                  </a>
                  {/* 新增寵物按鈕 end */}
                </div>
                <div className="col">
                  <div className="row row-cols-1 row-cols-lg-4 g-3">
                    {datas.map((item) => (
                      <div className="col" key={item.id}>
                        <div className="card p-3 rounded-4 border-0 ">
                          <img
                            src={item.image}
                            className="card-img-top rounded-3 object-fit-cover"
                            alt=""
                            height={200}
                          />
                          <div className="card-body pb-0">
                            <h5 className="text-center mb-1 d-flex align-items-center justify-content-center">
                              {item.name}
                              <Icon fileName={item.gender} size={24} />
                            </h5>
                            <p className="card-text text-grey-scale-2 text-center">
                              {item.age}
                            </p>
                            <button className="btn btn-primary w-100 rounded-pill mt-3 py-2">
                              查看詳情
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
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

export default UserPets;
