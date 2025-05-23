import { useEffect, useReducer, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Modal } from "bootstrap";
import Navbar from "../../components/common/NavBar";
import DatePicker from "@/components/common/DatePicker";
import api from "@/services/api";
import BookingResult from "../../components/booking/BookingResult";
import Icon from "../../components/common/Icon";

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const appointmentModalRef = useRef(null);
  const modalInstanceRef = useRef(null);
  const [result, setResult] = useState(null);

  const initialState = {
    clinic: {
      clinicsData: [],
      serviceOptions: [],
      speciesOptions: [],
      clinicsTime: [],
      vetClinicId: -1,
    },
    pet: {
      petOptions: [],
    },
    user: {
      userId: -1,
      userName: "",
    },
    appointment: {
      submitData: {},
    },
    ui: {
      isOpen: false,
    },
  };

  function reducer(state, action) {
    return {
      ...state,
      ...Object.keys(action).reduce((acc, key) => {
        acc[key] = { ...state[key], ...action[key] };
        return acc;
      }, {}),
    };
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const timeLabels = ["上午", "下午", "晚上"];
  const departmentLabels = [
    "一般內科",
    "一般外科",
    "皮膚科",
    "疫苗接種",
    "結紮手術",
    "牙科",
    "影像診斷(X光、超音波、CT/MRI)",
    "急診",
    "行為診療",
    "眼科",
    "腫瘤科",
    "泌尿科",
    "復健科",
    "寄生蟲防治",
    "繁殖服務",
    "特殊動物",
  ];
  const speciesLabels = [
    "犬科",
    "貓科",
    "小型齧齒類(鼠)",
    "中型齧齒類(兔)",
    "飛禽科",
    "爬蟲科",
    "特寵專科",
  ];

  useEffect(() => {
    modalInstanceRef.current = new Modal(appointmentModalRef.current, {
      keyboard: false,
    });
  }, []);

  useEffect(() => {
    if (state.ui.isOpen) {
      modalInstanceRef.current?.show();
    } else {
      modalInstanceRef.current?.hide();
    }
  }, [state.ui.isOpen]);

  const handleCloseModal = () => {
    if (appointmentModalRef.current) {
      const modalInstance = Modal.getInstance(appointmentModalRef.current);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
    dispatch({
      ui: {
        ...state.ui,
        isOpen: false,
      },
    });
  };

  useEffect(() => {
    const isBookingPage =
      location.pathname.includes("/booking") ||
      location.pathname.includes("/Booking");
    const urlParams = Object.fromEntries(searchParams);
    if (isNaN(urlParams.clinicId)) {
      navigate("/404");
      return;
    }

    const fetchData = async () => {
      if (isBookingPage) {
        let userData = JSON.parse(localStorage.getItem("user")) || {};
        try {
          let data;
          if (!location.state) {
            const fetchData = await api.get(
              `/vetClinics/${urlParams["clinicId"]}`
            );
            data = fetchData.data;
          } else if (location.state?.appointmentData) {
            data = location.state?.appointmentData.vetClinic;
          } else {
            data = location.state;
          }

          const petData = await api.get(`/pets?userId=${userData.id}`);
          const businessHours = data.businessHours;
          const day = new Date().getDay();
          if (userData?.name) setValue("userName", userData.name);

          dispatch({
            clinic: {
              clinicsData: data,
              vetClinicId: Number(urlParams["clinicId"]),
              serviceOptions: isNaN(data.services[0])
                ? data.services.map((item) => item.id)
                : data?.services,
              speciesOptions: isNaN(data.treatedAnimals[0])
                ? data.treatedAnimals.map((item) => item.id)
                : data?.treatedAnimals,
              clinicsTime: [
                businessHours[0][day === 0 ? 6 : day - 1],
                businessHours[1][day === 0 ? 6 : day - 1],
                businessHours[2][day === 0 ? 6 : day - 1],
              ],
            },
            pet: {
              petOptions: petData.data.map((pet) => ({
                id: pet.id,
                petName: pet.name,
              })),
            },
            user: {
              userId: userData?.id || "",
              userName: userData?.name || "",
            },
          });
        } catch {
          console.error("獸醫院資料取得失敗");
        }
      }
    };

    fetchData();
  }, [location.pathname, searchParams]);

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: new Date(),
      species: state.clinic.speciesOptions[0],
      department: state.clinic.serviceOptions[0],
    },
  });

  const handleDateChange = (date) => {
    const day = date.getDay();
    const businessHours = state.clinic.clinicsData.businessHours;

    dispatch({
      clinic: {
        clinicsTime: [
          businessHours[0][day === 0 ? 6 : day - 1],
          businessHours[1][day === 0 ? 6 : day - 1],
          businessHours[2][day === 0 ? 6 : day - 1],
        ],
      },
    });
  };

  const onSubmit = (data) => {
    dispatch({
      user: {
        userName: data.userName,
      },
      ui: {
        isOpen: true,
      },
      appointment: {
        submitData: {
          species: data.species,
          department: data.department,
          status: "已預約",
          appointmentDateTime: `${
            data.date.toLocaleString("sv").split(" ")[0]
          } ${
            data.time == "上午"
              ? "09:00-12:00"
              : data.time == "下午"
              ? "14:00-17:00"
              : "19:00-22:00"
          }`,
          visitDateTime: "",
          isCanceled: false,
          createTime: new Date().toLocaleString("sv"),
          updateTime: "",
          vetClinicId: state.clinic.vetClinicId,
          userId: state.user.userId ? state.user.userId : -1,
          petId: Number(data.petId),
        },
      },
    });
  };

  const confirmSubmit = async () => {
    dispatch({
      ui: {
        isOpen: false,
      },
    });
    try {
      const res = await api.post("/appointments", state.appointment.submitData);
      if (res.status === 201) {
        setResult(res.data);
      }
    } catch {
      console.error("預約失敗");
    }
  };

  return (
    <>
      <Navbar />
      <div className="booking d-flex justify-content-center align-items-center hv100-with-nav p-4">
        <div className="block bg-primary p-4">
          <h3 className="text-center mb-3 flex-column">
            填寫預約資料
            <span className="fs-6 text-tertiary">
              {state?.clinic?.clinicsData?.name}
            </span>
          </h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-field flex-column gap-2 mb-3">
              <h5 className="mb-3">飼主資訊</h5>
              {/* 填寫姓名 */}
              <div className="d-flex">
                <label
                  className="form-label required-field m-0"
                  htmlFor="booking-page-name"
                >
                  飼主姓名
                </label>
                {errors.userName && (
                  <span className="text-error h6-6 d-flex align-items-center gap-1 ms-auto">
                    <Icon fileName={"error"} size={18} />
                    {errors.userName.message}
                  </span>
                )}
              </div>
              <input
                type="text"
                id="booking-page-name"
                autoComplete="username"
                className={`input-text-primary mb-2`}
                defaultValue={state.user.userName}
                {...register("userName", { required: "請填寫姓名" })}
              />
              {/* 填寫寵物物種 */}
              <div className="d-flex">
                <label
                  className="form-label required-field m-0"
                  htmlFor="booking-page-species"
                >
                  預約物種
                </label>
                {errors.species && (
                  <span className="text-error h6-6 d-flex align-items-center gap-1 ms-auto">
                    <Icon fileName={"error"} size={18} />
                    {errors.species.message}
                  </span>
                )}
              </div>
              <select
                {...register("species", { required: "請選物種" })}
                className="form-select mb-2"
                id="booking-page-species"
              >
                <option value="">請選擇物種</option>
                {state.clinic.speciesOptions.map((id, index) => (
                  <option key={index} value={id}>
                    {speciesLabels[id - 1]}
                  </option>
                ))}
              </select>
              <div className="d-flex">
                <label
                  className="form-label required-field m-0"
                  htmlFor="booking-page-department"
                >
                  預約科別
                </label>
                {errors.department && (
                  <span className="text-error h6-6 d-flex align-items-center gap-1 ms-auto">
                    <Icon fileName={"error"} size={18} />
                    {errors.department.message}
                  </span>
                )}
              </div>
              <select
                {...register("department", { required: "請選科別" })}
                className="form-select mb-2"
                id="booking-page-department"
              >
                <option value="">請選擇科別</option>
                {state.clinic.serviceOptions.map((id, index) => (
                  <option key={index} value={id}>
                    {departmentLabels[id - 1]}
                  </option>
                ))}
              </select>
              <div className="d-flex">
                <label
                  className="form-label required-field m-0"
                  htmlFor="booking-page-date"
                >
                  預約日期
                </label>
                {errors.date && (
                  <span className="text-error h6-6 d-flex align-items-center gap-1 ms-auto">
                    <Icon fileName={"error"} size={18} />
                    {errors.date.message}
                  </span>
                )}
              </div>
              <Controller
                name="date"
                control={control}
                rules={{ required: "請選擇日期" }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    id="booking-page-date"
                    selected={field.value}
                    onChange={(date) => {
                      field.onChange(date);
                      handleDateChange(date);
                    }}
                    className="form-control"
                    placeholderText="請選擇日期"
                  />
                )}
              />
              <div className="d-flex mt-2">
                <label
                  className="form-label required-field m-0"
                  htmlFor="booking-page-time"
                >
                  預約時段
                </label>
                {errors.time && (
                  <span className="text-error h6-6 d-flex align-items-center gap-1 ms-auto">
                    <Icon fileName={"error"} size={18} />
                    {errors.time.message}
                  </span>
                )}
              </div>
              <select
                {...register("time", { required: "請選擇時段" })}
                className="form-select mb-2"
                id="booking-page-time"
              >
                <option value="">請選擇時段</option>
                {state.clinic.clinicsTime.map(
                  (isAvailable, index) =>
                    isAvailable && (
                      <option key={index} value={timeLabels[index]}>
                        {timeLabels[index]}
                      </option>
                    )
                )}
              </select>
              <hr className="mb-3" />
              <h5 className="mb-3">寵物資訊</h5>
              {/* 填寫寵物名稱 */}
              <label className="form-label m-0" htmlFor="booking-page-pet-name">
                寵物名稱
              </label>
              {state.pet?.petOptions?.length > 0 ? (
                <select
                  {...register("petId")}
                  className="form-select mb-2"
                  id="booking-page-pet-name"
                >
                  <option value="">請選擇寵物</option>
                  {state.pet.petOptions.map((pet) => (
                    <option key={pet.id} value={pet.id}>
                      {pet.petName}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  className="input-text-primary mb-2"
                  id="booking-page-pet-name"
                  {...register("petId")}
                />
              )}
            </div>
            <div className="d-flex gap-2 mt-5">
              <button
                type="reset"
                className="btn-m btn-outline-quaternary  w-50"
              >
                清除
              </button>
              <button
                type="submit"
                className="btn-m btn-quaternary mx-auto w-50"
              >
                預約
              </button>
            </div>
          </form>
        </div>

        <div className="modal" ref={appointmentModalRef} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header text-light bg-danger">
                <h5 className="modal-title">預約資訊</h5>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="btn-close btn-close-white"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body fz-20">
                <div className="mb-3">
                  <span>飼主姓名</span>
                  <span className="form-control-plaintext">
                    {state.user.userName}
                  </span>
                </div>
                <div className="mb-3">
                  <span>預約物種</span>
                  <span id="species" className="form-control-plaintext">
                    {state.appointment.submitData.species
                      ? speciesLabels[state.appointment.submitData.species - 1]
                      : "未選擇"}
                  </span>
                </div>
                <div className="mb-3">
                  <span>預約科別</span>
                  <span className="form-control-plaintext">
                    {state.appointment.submitData.department
                      ? departmentLabels[
                          state.appointment.submitData.department - 1
                        ]
                      : "未選擇"}
                  </span>
                </div>
                <div className="mb-3">
                  <span>預約時間</span>
                  <span className="form-control-plaintext">
                    {state.appointment.submitData
                      ? state.appointment.submitData.appointmentDateTime
                      : "未選擇"}
                  </span>
                </div>
                <div className="mb-3">
                  <span>寵物名稱</span>
                  <span id="pet-name" className="form-control-plaintext">
                    {state.appointment.submitData.petId
                      ? state.pet.petOptions.find(
                          (pet) => pet.id == state.appointment.submitData.petId
                        )?.petName || state.appointment.submitData.petId
                      : "未填選"}
                  </span>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="btn btn-outline-danger"
                  data-bs-dismiss="modal"
                >
                  返回修改
                </button>
                <button
                  type="button"
                  onClick={confirmSubmit}
                  className="btn btn-outline-quaternary"
                >
                  確認送出
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {result !== null && (
        <BookingResult
          result={result}
          reset={() => {
            reset();
            setResult(null);
          }}
        />
      )}
    </>
  );
}
