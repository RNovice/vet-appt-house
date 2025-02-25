import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { cities, districts } from "../../utils/constants";
import BtnEdit from "./BtnEdit";
import axios from "axios";

const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST;

const UserForm = () => {
  const [currentCity, setCurrentCity] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // mode: "onTouched",
  });

  const [userData, setUserData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const url = `${BACKEND_HOST}/users/2`;
        const res = await axios.get(url);
        setUserData(res.data);
      } catch (error) {
        console.log("取得使用者資料失敗");
      }
    })();
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="user bg-cover">
        <div className="container">
          <h2 className="title mb-4 mb-lg-5">Welcome, {userData.name}</h2>
          <div className="card p-3 p-lg-5 border-0 rounded-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row mb-4">
                <div className="col d-flex align-items-center">
                  <div className="me-1 me-lg-4">
                    <img
                      className="rounded-circle object-fit-cover"
                      src={userData.imageUrl}
                      width="100"
                      height="100"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="mb-1">{userData.name}</p>
                    <p className="text-grey-scale-2"> {userData.email}</p>
                  </div>
                </div>
                <div className="col text-end d-none d-lg-block">
                  <BtnEdit customStyle="px-4" />
                </div>
              </div>
              <div className="row g-3 mb-3 g-lg-4 mb-lg-4">
                <div className="col-lg-6">
                  <label htmlFor="name" className="form-label">
                    姓名
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`form-control ${errors.name && "is-invalid"} `}
                    {...register("name", {
                      required: "請輸入姓名。",
                    })}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">
                      {errors.name.message}
                    </div>
                  )}
                </div>
                <div className="col">
                  <label htmlFor="phone" className="form-label">
                    電話
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className={`form-control ${errors.phone && "is-invalid"} `}
                    {...register("phone", {
                      required: "請輸入電話。",
                      minLength: {
                        value: 8,
                        message: "電話號碼至少需要 8 碼。",
                      },
                      pattern: {
                        value: /^\d+$/,
                        message: "電話號碼格式不正確，僅限數字。",
                      },
                    })}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">
                      {errors.phone.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="row g-3 mb-3 g-lg-4 mb-lg-4">
                <div className="col-lg-6">
                  <label htmlFor="birthday" className="form-label">
                    生日
                  </label>
                  <input
                    id="birthday"
                    type="date"
                    className={`form-select ${
                      errors.birthday && "is-invalid"
                    } `}
                    {...register("birthday", {
                      required: "請輸入生日。",
                    })}
                  />
                  {errors.birthday && (
                    <div className="invalid-feedback">
                      {errors.birthday.message}
                    </div>
                  )}
                </div>
                <div className="col">
                  <label htmlFor="gender" className="form-label">
                    性別
                  </label>
                  <select
                    id="gender"
                    defaultValue=""
                    className={`form-select ${errors.gender && "is-invalid"} `}
                    {...register("gender", {
                      required: "請選擇性別。",
                    })}
                  >
                    <option value="" disabled>
                      請選擇
                    </option>
                    <option value="female">女性</option>
                    <option value="male">男性</option>
                    <option value="unknow">不願透漏</option>
                  </select>
                  {errors.gender && (
                    <div className="invalid-feedback">
                      {errors.gender.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="row g-3 mb-4 g-lg-4 mb-lg-0">
                <div className="col-lg-6">
                  <label className="form-label">地址</label>
                  <div className="row g-3">
                    <div className="col-12 col-lg-3">
                      <select
                        id="city"
                        defaultValue=""
                        className={`form-select ${
                          errors.city && "is-invalid"
                        } `}
                        {...register("city", {
                          required: "請選擇縣市。",
                          onChange: (e) => {
                            //console.log(e.target.value);
                            setCurrentCity(e.target.value);
                          },
                        })}
                      >
                        <option value="" disabled>
                          請選擇
                        </option>
                        {cities.map((item, idx) => (
                          <option value={item.city} key={idx}>
                            {item.city}
                          </option>
                        ))}
                      </select>
                      {errors.city && (
                        <div className="invalid-feedback">
                          {errors.city.message}
                        </div>
                      )}
                    </div>
                    <div className="col-12 col-lg-3">
                      <select
                        id="district"
                        defaultValue=""
                        className={`form-select ${
                          errors.district && "is-invalid"
                        } `}
                        {...register("district", {
                          required: "請選擇區域。",
                        })}
                      >
                        <option value="" disabled>
                          請選擇
                        </option>
                        {districts
                          .filter((item) => item.city == currentCity)
                          .map((item, idx) => (
                            <option value={item.dist} key={idx}>
                              {item.dist}
                            </option>
                          ))}
                      </select>
                      {errors.district && (
                        <div className="invalid-feedback">
                          {errors.district.message}
                        </div>
                      )}
                    </div>
                    <div className="col">
                      <input
                        id="address"
                        type="text"
                        className={`form-control ${
                          errors.address && "is-invalid"
                        } `}
                        placeholder="請輸入地址。"
                        {...register("address", {
                          required: "請輸入地址。",
                        })}
                      />
                      {errors.address && (
                        <div className="invalid-feedback">
                          {errors.address.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* <div className="col"></div> */}
              </div>
              <div className="row d-lg-none">
                <div className="col-12">
                  <BtnEdit customStyle="w-100 rounded-pill" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserForm;
