import { useState, useEffect } from "react";
import api from "../services/api";
import Icon from "@/components/common/Icon";
import Paginator from "@/components/common/Paginator";
import "@/assets/styles/Dashboard.scss";

const options = [
  { label: "全部", value: "" },
  { label: "已啟用", value: "enabled" },
  { label: "未啟用", value: "disabled" },
];

const VetManagementPage = () => {
  const [clinicData, setClinicData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("");

  const getClinicData = async (page = 1, noKeyword = false) => {
    try {
      const {
        data: {
          data,
          pagination: { totalPages, current },
        },
      } = await api.get(
        `/vetClinics?limit=${10}&status=${filter}&page=${page}${
          noKeyword || !keyword ? "" : `&keyword=${keyword}`
        }`
      );
      setCurrentPage(current);
      setTotalPages(totalPages);
      setClinicData(data);
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  useEffect(() => {
    getClinicData();
  }, [filter]);

  const handleStatus = async (id, status) => {
    try {
      await api.patch(`/vetClinics/${id}/${status}`);
    } catch (error) {
      console.log("handleStatus Error: ", error);
    }
    getClinicData(currentPage);
  };

  const handleClearKeyword = () => {
    setKeyword("");
    getClinicData(1, true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getClinicData();
  };

  return (
    <div className="vet-manage p-4 mt-3">
      <div className="container">
        <form
          className="d-flex justify-content-end align-items-center gap-2"
          onSubmit={handleSubmit}
        >
          {options.map(({ label, value }) => (
            <div
              key={`filter-${value}`}
              className={`btn btn${
                filter === value ? "" : "-outline"
              }-primary rounded-pill me-2`}
              onClick={() => setFilter(value)}
            >
              {label}
            </div>
          ))}
          <div className="position-relative">
            <input
              type="text"
              id="find-vet-keyword"
              className="input-text-primary pe-4"
              placeholder="請輸入醫院名稱"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            {keyword.length > 0 && (
              <span
                title="清除關鍵字"
                onClick={handleClearKeyword}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "0.75rem",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: "#555",
                }}
                role="button"
              >
                X
              </span>
            )}
          </div>
          <button
            className="btn-quaternary fs-6 d-flex justify-content-center align-items-center gap-1 border-0 rounded px-2 py-1 h-100"
            type="submit"
          >
            搜尋
            <Icon fileName={"search"} size={20} />
          </button>
        </form>

        <table
          className="table mt-5"
          style={{ "--bs-table-bg": "transparent", tableLayout: "fixed" }}
        >
          <thead>
            <tr className="fs-4">
              <th scope="col">名稱</th>
              <th scope="col">縣市</th>
              <th scope="col">地區</th>
              <th scope="col">是否啟用</th>
              <th scope="col">編輯</th>
            </tr>
          </thead>
          <tbody>
            {clinicData.slice(0, 10)?.map((data) => {
              return (
                <tr key={data.id} className="fs-5">
                  <td>{data.name}</td>
                  <td>{data.city}</td>
                  <td>{data.district}</td>
                  <td>
                    {data.isEnabled ? (
                      <span className="text-success">啟用</span>
                    ) : (
                      <span>未啟用</span>
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleStatus(data.id, "enable")}
                      className="btn btn-outline-primary me-2"
                      disabled={data.isEnabled}
                    >
                      啟用
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatus(data.id, "disable")}
                      className="btn btn-outline-danger"
                      disabled={!data.isEnabled}
                    >
                      停用
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {totalPages > 1 && (
          <Paginator
            className="mt-4 d-flex justify-content-center"
            currentPage={currentPage}
            onPageChange={getClinicData}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  );
};

export default VetManagementPage;
