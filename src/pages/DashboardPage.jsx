import { useEffect, useReducer } from "react";
import api from "../services/api";

const Dashboard = () => {
  const initialState = {
    clinicsNum: 0,
    usersNum: 0,
    petsNum: 0,
    visitsNum: 0,
  };

  function reducer(state, action) {
    return { ...state, ...action };
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  async function getVetClinicsList() {
    const {
      data: { totalClinic: clinicsNum, cityClinicAmount },
    } = await api("/clinicAnalyze");

    dispatch({ clinicsNum });

    return Object.entries(cityClinicAmount);
  }

  async function getUserList() {
    const res = await api("/users");
    const resUsers = res.data;

    const userData = {};
    resUsers.forEach((item) => {
      if (userData[item.address.city]) {
        userData[item.address.city] += 1;
      } else {
        userData[item.address.city] = 1;
      }
    });

    dispatch({
      usersNum: resUsers.length,
    });

    return Object.entries(userData);
  }

  async function getVisitedPetList() {
    const res = await api("/appointments?_expand=vetClinic");
    const resVisitedPets = res.data;

    const visitedPetData = {};
    resVisitedPets.forEach((item) => {
      if (visitedPetData[item.vetClinic.city]) {
        visitedPetData[item.vetClinic.city] += 1;
      } else {
        visitedPetData[item.vetClinic.city] = 1;
      }
    });

    dispatch({
      visitsNum: resVisitedPets.length,
    });

    return Object.entries(visitedPetData);
  }

  async function getSpeciesList() {
    const res = await api("/pets");
    const resSpecies = res.data;
    const res2 = await api("/treatedAnimals");
    const resTreatedAnimals = res2.data;

    let speciesData = [];

    resTreatedAnimals.forEach((item) =>
      speciesData.push({ [item.species]: 0 })
    );

    resSpecies.forEach((pet) => {
      const key = Object.keys(speciesData[pet.specieId - 1])[0];
      speciesData[pet.specieId - 1][key] += 1;
      //petsData[pet.specieId-1][key]+=1
    });

    const speciesDataList = [];
    let key, value;
    speciesData.forEach((pet) => {
      [[key, value]] = Object.entries(pet);
      speciesDataList.push([key, value]);
    });

    dispatch({
      petsNum: resSpecies.length,
    });

    return speciesDataList;
  }

  async function renderData() {
    const chartData = await getVetClinicsList();
    const chartUerData = await getUserList();
    const chartVisitedPetData = await getVisitedPetList();
    const chartSpeciesData = await getSpeciesList();

    c3.generate({
      bindto: "#chart", // HTML 元素綁定
      data: {
        type: "bar",
        columns: chartData,
      },
      color: {
        pattern: [
          "#1f77b4",
          "#aec7e8",
          "#ff7f0e",
          "#ffbb78",
          "#2ca02c",
          "#98df8a",
          "#d62728",
          "#ff9896",
          "#9467bd",
          "#c5b0d5",
          "#8c564b",
          "#c49c94",
          "#e377c2",
          "#f7b6d2",
          "#7f7f7f",
          "#c7c7c7",
          "#bcbd22",
          "#dbdb8d",
          "#17becf",
          "#9edae5",
        ],
      },
    });

    c3.generate({
      bindto: "#userChart", // HTML 元素綁定
      data: {
        type: "pie",
        columns: chartUerData,
      },
      color: {
        pattern: [
          "#1f77b4",
          "#aec7e8",
          "#ff7f0e",
          "#ffbb78",
          "#2ca02c",
          "#98df8a",
          "#d62728",
          "#ff9896",
          "#9467bd",
          "#c5b0d5",
          "#8c564b",
          "#c49c94",
          "#e377c2",
          "#f7b6d2",
          "#7f7f7f",
          "#c7c7c7",
          "#bcbd22",
          "#dbdb8d",
          "#17becf",
          "#9edae5",
        ],
      },
    });

    c3.generate({
      bindto: "#visitedPetChart", // HTML 元素綁定
      data: {
        type: "pie",
        columns: chartVisitedPetData,
      },
      color: {
        pattern: [
          "#1f77b4",
          "#aec7e8",
          "#ff7f0e",
          "#ffbb78",
          "#2ca02c",
          "#98df8a",
          "#d62728",
          "#ff9896",
          "#9467bd",
          "#c5b0d5",
          "#8c564b",
          "#c49c94",
          "#e377c2",
          "#f7b6d2",
          "#7f7f7f",
          "#c7c7c7",
          "#bcbd22",
          "#dbdb8d",
          "#17becf",
          "#9edae5",
        ],
      },
    });

    c3.generate({
      bindto: "#speciesChart", // HTML 元素綁定
      data: {
        type: "pie",
        columns: chartSpeciesData,
      },
      color: {
        pattern: [
          "#1f77b4",
          "#aec7e8",
          "#ff7f0e",
          "#ffbb78",
          "#2ca02c",
          "#98df8a",
          "#d62728",
          "#ff9896",
          "#9467bd",
          "#c5b0d5",
          "#8c564b",
          "#c49c94",
          "#e377c2",
          "#f7b6d2",
          "#7f7f7f",
          "#c7c7c7",
          "#bcbd22",
          "#dbdb8d",
          "#17becf",
          "#9edae5",
        ],
      },
    });
  }

  useEffect(() => {
    renderData();
  }, []);

  return (
    <div
      className="dashboard p-4"
      style={{ margin: "0 auto", maxWidth: "80%" }}
    >
      <div className="row mt-5">
        <ul
          className="d-flex mt-3 gap-3 mb-3"
          style={{ height: "90px", paddingRight: "80px" }}
        >
          <li
            className="col-md-3 text-white p-5 fs-4"
            style={{
              backgroundColor: "#007bff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div className="d-flex justify-content-between">
              <span>全台獸醫院數量</span>
              <span>{state.clinicsNum}</span>
            </div>
          </li>
          <li
            className="col-md-3 text-white p-5 fs-4"
            style={{
              backgroundColor: "#ffc107",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div className="d-flex justify-content-between">
              <span>註冊用戶</span>
              <span>{state.usersNum}</span>
            </div>
          </li>
          <li
            className="col-md-3 text-white p-5 fs-4"
            style={{
              backgroundColor: "#28a745",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div className="d-flex justify-content-between">
              <span>登記寵物</span>
              <span>{state.petsNum}</span>
            </div>
          </li>
          <li
            className="col-md-3 text-white p-5 fs-4"
            style={{
              backgroundColor: "#dc3545",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div className="d-flex justify-content-between">
              <span>就診數量</span>
              <span>{state.visitsNum}</span>
            </div>
          </li>
        </ul>
      </div>
      <div className="row mt-3" style={{ paddingRight: "20px" }}>
        <div className="col-md-4">
          <div className="mb-3 card" style={{ height: "400px" }}>
            <div className="card-header p-3">
              <div className="card-header-title">全台飼主分布</div>
            </div>
            <div className="card-body">
              <div id="userChart"></div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="mb-3 card" style={{ height: "400px" }}>
            <div className="card-header p-3">
              <div className="card-header-title">就診寵物分布</div>
            </div>
            <div className="card-body">
              <div id="visitedPetChart"></div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="mb-3 card" style={{ height: "400px" }}>
            <div className="card-header p-3">
              <div className="card-header-title">寵物類別</div>
            </div>
            <div className="card-body">
              <div id="speciesChart"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3" style={{ paddingRight: "20px" }}>
        <div className="mb-3 card" style={{ height: "400px" }}>
          <div className="card-header p-3">
            <div className="card-header-title">全台獸醫院分布</div>
          </div>
          <div className="card-body">
            <div id="chart"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
