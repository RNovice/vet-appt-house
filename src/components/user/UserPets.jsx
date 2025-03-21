import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Icon from "../common/Icon";
import PetsModal from "./PetsModal";
import * as bootstrap from "bootstrap";
import { useAuth } from "@/context/AuthContext";

const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST;

const UserPets = () => {
  const [petsData, setPetsData] = useState([]);
  const [petData, setPetData] = useState([]);
  const [modalType, setModalType] = useState("new");
  const [speciesData, setSpeciesData] = useState([]);
  const petsModalRef = useRef(null);
  const { user } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    petsModalRef.current = new bootstrap.Modal("#petsModal", {
      keyboard: false,
    });

    getPetsData();

    (async () => {
      try {
        const url = `${BACKEND_HOST}/species`;
        const res = await axios.get(url);
        setSpeciesData(res.data);
      } catch (err) {
        console.log("取得物種資料失敗", err);
      }
    })();
  }, []);

  const getPetsData = async () => {
    const url = `${BACKEND_HOST}/users/${userId}/pets?userId=${userId}`;
    const res = await axios.get(url);
    // updateTime 新到舊排序, 只取四筆
    const sortedPetsData = res.data.sort(
      (a, b) =>
        new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime()
    );
    setPetsData(sortedPetsData.slice(0, 4));
  };

  const openModal = useCallback((type, petData) => {
    if (type === "new") {
      setPetData(null);
      setModalType("new");
    } else {
      setPetData(petData);
      setModalType("detail");
    }
    petsModalRef.current.show();
  }, []);

  // const closeModal = useCallback(() => {
  //   petsModalRef.current.hide();
  // }, []);

  return (
    <>
      <PetsModal
        speciesData={speciesData}
        modalType={modalType}
        petData={petData}
        userId={userId}
        getPetsData={getPetsData}
      />
      <div className="userPrts bg-cover" id="pets">
        <div className="container">
          <div className="d-flex align-items-end justify-content-between mb-5">
            <div></div>
            <h3 className="section-title text-secondary">我的寵物</h3>
            {petsData && petsData.length > 0 ? (
              <Link className="fs-6 d-none d-lg-block" to="/user/pets">
                查看全部
              </Link>
            ) : (
              ""
            )}
          </div>
          {petsData && petsData.length == 0 ? (
            <div onClick={() => openModal("new")}>
              {/* 新增寵物按鈕-desktop */}
              <div className="card p-3 rounded-4 border-0">
                <div className="card-body align-items-lg-center justify-content-lg-center d-lg-flex p-0 text-center">
                  <div className="align-items-center justify-content-center d-flex ">
                    <Icon fileName={"add-circle"} size={24} />
                    <span className="ms-4">新增寵物</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="row g-3">
                <div className="col-12 col-lg-1 order-1">
                  {/* 新增寵物按鈕-mobile */}
                  <div onClick={() => openModal("new")} className="h-100">
                    <div className="add-pet card p-3 rounded-4 border-0 h-100">
                      <div className="card-body align-items-lg-center justify-content-lg-center d-lg-flex p-0 text-center">
                        <span className="align-items-center justify-content-center d-flex ">
                          <Icon fileName={"add-circle"} size={24} />
                          <span className="ms-4 ms-lg-0 mt-lg-4">新增寵物</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* 新增寵物按鈕 end */}
                </div>
                <div className="col">
                  <div className="row row-cols-1 row-cols-lg-4 g-3">
                    {petsData.map((item) => (
                      <div className="col" key={item.id}>
                        <div className="card p-3 rounded-4 border-0 ">
                          <img
                            src={item.imageUrl}
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
                            <button
                              className="btn btn-primary w-100 rounded-pill mt-3 py-2"
                              onClick={() => openModal("detail", item)}
                            >
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
                  <Link className="fs-6 p-3" to="/user/pets">
                    查看全部
                  </Link>
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
