import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useMobile } from "@/context/MobileContext";
import DropDownList from "@/components/common/DropDownList";
import DatePicker from "@/components/common/DatePicker";
import Icon from "@/components/common/Icon";

const VetSearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMobile();
  const [selectedDate, setSelectedDate] = useState(null);
  const [results, setResults] = useState([]);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // const onSubmit = (data) => {
  //   console.log(data);
  //   reset({
  //     city: null,
  //     area: null,
  //     date: null,
  //     time: null,
  //     keyword: "",
  //     checkboxes: {},
  //   });
  //   setSelectedDate(null);
  // };

  const options = [
    { value: "台北", label: "台北" },
    { value: "高雄", label: "高雄" },
  ];

  const timeOptions = [
    { value: "早上", label: "早上" },
    { value: "下午", label: "下午" },
    { value: "晚上", label: "晚上" },
    { value: "不限", label: "不限" },
  ];

  const isResultPage = location.pathname.includes("/search/result");

  const onSubmit = (data) => {
    const query = new URLSearchParams(data).toString();
    navigate(`/search/result?${query}`);
    if (isMobile) {
      const resultEle = document.querySelector(".clinic-results");
      resultEle && resultEle.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isResultPage) {
      const queryParams = new URLSearchParams(location.search);
      const searchParams = Object.fromEntries(queryParams.entries());
      fetchResults(searchParams);
    }
  }, [location.search]);

  const fetchResults = async (params) => {
    setResults([
      {
        id: 1,
        name: "台北動物醫院",
        city: "台北市",
        district: "信義區",
        phone: "02-1234-5678",
        tags: ["24HR營業", "夜間急診"],
      },
      {
        id: 2,
        name: "高雄寵物診所",
        city: "高雄市",
        district: "前鎮區",
        phone: "07-8765-4321",
        tags: ["電話預約", "汽車停車"],
      },
      {
        id: 3,
        name: "台中寵物診所",
        city: "台中市",
        district: "西區",
        phone: "05-8765-4321",
        tags: [
          // "24HR營業",
          // "夜間急診",
          // "現場掛號",
          // "電話預約",
          // "機車停車",
          // "汽車停車",
        ],
      },
      {
        id: 11,
        name: "台北動物醫院",
        city: "台北市",
        district: "信義區",
        phone: "02-1234-5678",
        tags: ["24HR營業", "夜間急診"],
      },
      {
        id: 21,
        name: "高雄寵物診所",
        city: "高雄市",
        district: "前鎮區",
        phone: "07-8765-4321",
        tags: ["電話預約", "汽車停車"],
      },
      {
        id: 31,
        name: "台中寵物診所",
        city: "台中市",
        district: "西區",
        phone: "05-8765-4321",
        tags: [
          "24HR營業",
          "夜間急診",
          "現場掛號",
          "電話預約",
          "機車停車",
          "汽車停車",
        ],
      },
      {
        id: 12,
        name: "台北動物醫院",
        city: "台北市",
        district: "信義區",
        phone: "02-1234-5678",
        tags: ["24HR營業", "夜間急診"],
      },
      {
        id: 22,
        name: "高雄寵物診所",
        city: "高雄市",
        district: "前鎮區",
        phone: "07-8765-4321",
        tags: ["電話預約", "汽車停車"],
      },
      {
        id: 32,
        name: "台中寵物診所",
        city: "台中市",
        district: "西區",
        phone: "05-8765-4321",
        tags: [
          "24HR營業",
          "夜間急診",
          "現場掛號",
          "電話預約",
          "機車停車",
          "汽車停車",
        ],
      },
      {
        id: 13,
        name: "台北動物醫院",
        city: "台北市",
        district: "信義區",
        phone: "02-1234-5678",
        tags: ["24HR營業", "夜間急診"],
      },
      {
        id: 23,
        name: "高雄寵物診所",
        city: "高雄市",
        district: "前鎮區",
        phone: "07-8765-4321",
        tags: ["電話預約", "汽車停車"],
      },
      {
        id: 33,
        name: "台中寵物診所",
        city: "台中市",
        district: "西區",
        phone: "05-8765-4321",
        tags: [
          "24HR營業",
          "夜間急診",
          "現場掛號",
          "電話預約",
          "機車停車",
          "汽車停車",
        ],
      },
      {
        id: 131,
        name: "台北動物醫院",
        city: "台北市",
        district: "信義區",
        phone: "02-1234-5678",
        tags: ["24HR營業", "夜間急診"],
      },
      {
        id: 231,
        name: "高雄寵物診所",
        city: "高雄市",
        district: "前鎮區",
        phone: "07-8765-4321",
        tags: ["電話預約", "汽車停車"],
      },
      {
        id: 331,
        name: "台中寵物診所",
        city: "台中市",
        district: "西區",
        phone: "05-8765-4321",
        tags: [
          "24HR營業",
          "夜間急診",
          "現場掛號",
          "電話預約",
          "機車停車",
          "汽車停車",
        ],
      },
      {
        id: 132,
        name: "台北動物醫院",
        city: "台北市",
        district: "信義區",
        phone: "02-1234-5678",
        tags: ["24HR營業", "夜間急診"],
      },
      {
        id: 232,
        name: "高雄寵物診所",
        city: "高雄市",
        district: "前鎮區",
        phone: "07-8765-4321",
        tags: ["電話預約", "汽車停車"],
      },
      {
        id: 332,
        name: "台中寵物診所",
        city: "台中市",
        district: "西區",
        phone: "05-8765-4321",
        tags: [
          "24HR營業",
          "夜間急診",
          "現場掛號",
          "電話預約",
          "機車停車",
          "汽車停車",
        ],
      },
      {
        id: 134,
        name: "台北動物醫院",
        city: "台北市",
        district: "信義區",
        phone: "02-1234-5678",
        tags: ["24HR營業", "夜間急診"],
      },
      {
        id: 234,
        name: "高雄寵物診所",
        city: "高雄市",
        district: "前鎮區",
        phone: "07-8765-4321",
        tags: ["電話預約", "汽車停車"],
      },
      {
        id: 334,
        name: "台中寵物診所",
        city: "台中市",
        district: "西區",
        phone: "05-8765-4321",
        tags: [
          "24HR營業",
          "夜間急診",
          "現場掛號",
          "電話預約",
          "機車停車",
          "汽車停車",
        ],
      },
    ]);
  };

  return (
    <div className="vet-search hv100-with-nav">
      <div className="vet-search-container mx-auto">
        <form
          className={`bg-secondary mx-auto ${isResultPage ? "" : "no-results"}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid-item-1 flex-column gap-1">
            <label className="h6 d-flex gap-2" htmlFor="find-vet-city">
              縣市
              {errors.city && (
                <span className="text-error h6-6 d-flex align-items-center gap-1 ms-auto">
                  <Icon fileName={"error"} size={20} />
                  {errors.city.message}
                </span>
              )}
            </label>
            <Controller
              name="city"
              control={control}
              rules={{ required: "必選" }}
              render={({ field }) => (
                <DropDownList
                  inputId="find-vet-city"
                  {...field}
                  options={options}
                  placeholder="請選擇縣市"
                  hasError={errors.city}
                />
              )}
            />
          </div>
          <div className="grid-item-2 flex-column gap-1">
            <label className="h6" htmlFor="find-vet-area">
              地區
            </label>
            <Controller
              name="area"
              control={control}
              render={({ field }) => (
                <DropDownList
                  inputId="find-vet-area"
                  {...field}
                  options={options}
                  placeholder="請選擇地區"
                />
              )}
            />
          </div>
          <div className="grid-item-3 input-field flex-column gap-1">
            <label className="h6" htmlFor="find-vet-keyword">
              關鍵字搜尋
            </label>
            <Controller
              name="keyword"
              control={control}
              render={({ field }) => (
                <input
                  id="find-vet-keyword"
                  className="input-text-primary"
                  type="text"
                  placeholder="請輸入醫院名稱"
                  {...field}
                  value={field.value ?? ""}
                />
              )}
            />
          </div>
          <button
            className="grid-button btn-quaternary fs-6 justify-content-center align-items-center gap-1"
            type="submit"
          >
            搜尋
            <Icon fileName={"search"} size={20} />
          </button>
          <div className="grid-item-4 flex-column gap-1">
            <label className="h6" htmlFor="find-vet-date">
              日期
            </label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  id="find-vet-date"
                  {...field}
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                />
              )}
            />
          </div>
          <div className="grid-item-5 flex-column gap-1">
            <label className="h6" htmlFor="find-vet-time">
              時段
            </label>
            <Controller
              name="time"
              control={control}
              render={({ field }) => (
                <DropDownList
                  inputId="find-vet-time"
                  {...field}
                  icon={"clock"}
                  options={timeOptions}
                  placeholder="請選擇時段"
                />
              )}
            />
          </div>
          <div className="grid-item-6 checkbox-group d-flex flex-wrap">
            {[
              "24HR營業",
              "夜間急診",
              "現場掛號",
              "電話預約",
              "機車停車",
              "汽車停車",
            ].map((label, i) => (
              <label
                className="custom-checkbox d-flex align-items-center gap-1"
                key={`other-req-checkbox-${i}`}
                htmlFor={`other-req-checkbox-${i}`}
              >
                <Controller
                  name={`checkboxes.${label}`}
                  control={control}
                  render={({ field }) => (
                    <input
                      id={`other-req-checkbox-${i}`}
                      type="checkbox"
                      checked={field.value ?? false}
                      {...field}
                    />
                  )}
                />
                {label}
              </label>
            ))}
            <button
              className="btn-2 btn-quaternary fs-6 justify-content-center align-items-center gap-1"
              type="submit"
            >
              搜尋
              <Icon fileName={"search"} size={20} />
            </button>
          </div>
        </form>
        {isResultPage && (
          <div className="clinic-results w-100 mx-auto">
            {results.map((clinic) => (
              <div key={clinic.id} className="clinic-card flex-column gap-2">
                <ruby className="h5">
                  {clinic.name} <rp>(</rp>
                  <rt>
                    {clinic.city} {clinic.district}
                  </rt>
                  <rp>)</rp>
                </ruby>
                <p className="h6 text-tertiary d-flex align-items-center gap-1">
                  <Icon fileName="phone" size={15} />
                  {clinic.phone}
                </p>
                <div className="tags d-flex flex-wrap gap-1">
                  {clinic.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-auto pt-1">
                  <Link className="view-detail fs-6" to="/veterinary">
                    查看詳細資料
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VetSearchPage;
