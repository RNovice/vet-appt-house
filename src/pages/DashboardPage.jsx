import axios from 'axios';
import { Link } from 'react-router-dom';
import '../assets/styles/Dashboard.scss'
import { useEffect, useReducer } from 'react';

const Dashboard = () => {
    const initialState = {
        clinicsNum:0,
        usersNum:0,
        petsNum:0,
        visitsNum:0
    }

    function reducer(state, action){
      return {...state, ...action}
    }

    /* useEffect(()=>{
        const fetchData = async() =>{
            const data = await axios.get('https://vet-appt-house-backend.onrender.com/vetClinics')
            console.log("useEffect", data.data.length)
        }
        fetchData()
    },[]) */

    const [state, dispatch] = useReducer(reducer, initialState);

    async function getVetClinicsList(){
    const res = await axios.get('https://vet-appt-house-backend.onrender.com/vetClinics')
    const data = res.data
    const cityData = {}
    data.forEach((item) => {
        if(cityData[item["city"]]){
        cityData[item["city"]] += 1
        } else {
        cityData[item["city"]] = 1
        }
    })

    dispatch({
        clinicsNum:data.length
    })

    return Object.entries(cityData)
    }

    async function getUserList(){
        const res = await axios.get('https://vet-appt-house-backend.onrender.com/users')
        const resUsers = res.data 

        const userData = {}
        resUsers.forEach(item=>{
            if(userData[item.address.city]){
            userData[item.address.city]+=1
            }else{
            userData[item.address.city]=1
            }
        })

        dispatch({
            usersNum:resUsers.length
        })
        
        return Object.entries(userData)
    }

    async function getVisitedPetList(){
        const res = await axios.get('https://vet-appt-house-backend.onrender.com/appointments?_expand=vetClinic')
        const resVisitedPets = res.data 

        const visitedPetData = {}
        resVisitedPets.forEach(item=>{
            if(visitedPetData[item.vetClinic.city]){
            visitedPetData[item.vetClinic.city]+=1
            }else{
            visitedPetData[item.vetClinic.city]=1
            }
        })

        dispatch({
            visitsNum:resVisitedPets.length
        })
        
        return Object.entries(visitedPetData)
    }

    async function getSpeciesList(){
        const res = await axios.get('https://vet-appt-house-backend.onrender.com/pets')
        const resSpecies = res.data 
        const res2 = await axios.get('https://vet-appt-house-backend.onrender.com/treatedAnimals')
        const resTreatedAnimals = res2.data
        
        let speciesData = []
        let treatedAnimalsData = []

        resTreatedAnimals.forEach(item=>speciesData.push({[item.species]:0}))
        
        resSpecies.forEach(pet=>{
            const key = Object.keys(speciesData[pet.specieId-1])[0]
            speciesData[pet.specieId-1][key]+=1
            //petsData[pet.specieId-1][key]+=1
        })
        
        const speciesDataList = []
        let key, value;
        speciesData.forEach(pet=>{
            [[key,value]] = Object.entries(pet)
            speciesDataList.push([key,value])
        })

        dispatch({
            petsNum:resSpecies.length,
        })
  
        return speciesDataList
    }

    async function renderData(){
    const  chartData = await getVetClinicsList()
    const  chartUerData = await getUserList()
    const  chartVisitedPetData = await getVisitedPetList()
    const chartSpeciesData = await getSpeciesList()

    let chart = c3.generate({
        bindto: '#chart', // HTML 元素綁定
        data: {
            type: "bar",
            columns: chartData,
        },
        color: {
            pattern: ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
        }
    });

    let userChart = c3.generate({
        bindto: '#userChart', // HTML 元素綁定
        data: {
            type: "pie",
            columns: chartUerData,
        },
        color: {
            pattern: ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
        }
    });
       
    
    let visitedPetChart = c3.generate({
            bindto: '#visitedPetChart', // HTML 元素綁定
            data: {
                type: "pie",
                columns: chartVisitedPetData,
            },
            color: {
                pattern: ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
            }
    }); 
    
    let speciesChart = c3.generate({
        bindto: '#speciesChart', // HTML 元素綁定
        data: {
        type: "pie",
        columns: chartSpeciesData,
        },
        color: {
        pattern: ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
        }
    });

    }

    renderData()

    return (
        <div className="row">
            <div className="col-md-2 mt-3">
                <div className="sideBar w-100">
                    <div className="container h-100">
                        <div className='d-flex flex-column justify-content-center align-items-center fs-2 border-bottom' style={{height:'200px', fontWeight:900}}>後台管理</div>
                        <Link to="" className="sideBarLink d-flex justify-content-center mt-5 mb-5">
                            網站概況
                        </Link>
                        <Link onTouchEnd="" className="sideBarLink d-flex justify-content-center">
                            獸醫院管理
                        </Link>
                    </div>

                </div>
            </div>
            <div className="col-md-9">
                <div className='row'>
                    <ul className='d-flex mt-3 gap-3 mb-3' style={{height:'90px'}}>
                        <li className='col-md-3 text-white p-5 fs-4' style={{backgroundColor:'#007bff', display:'flex', flexDirection:'column', justifyContent:'center'}}>
                            <div className='d-flex justify-content-between'><span>全台獸醫院數量</span><span>{state.clinicsNum}</span></div>
                        </li>
                        <li className='col-md-3 text-white p-5 fs-4' style={{backgroundColor:'#ffc107', display:'flex', flexDirection:'column', justifyContent:'center'}}>
                            <div className='d-flex justify-content-between'><span>註冊用戶</span><span>{state.usersNum}</span></div>
                        </li>
                        <li className='col-md-3 text-white p-5 fs-4' style={{backgroundColor:'#28a745', display:'flex', flexDirection:'column', justifyContent:'center'}}>
                            <div className='d-flex justify-content-between'><span>登記寵物</span><span>{state.petsNum}</span></div>
                        </li>
                        <li className='col-md-3 text-white p-5 fs-4' style={{backgroundColor:'#dc3545', display:'flex', flexDirection:'column', justifyContent:'center'}}>
                            <div className='d-flex justify-content-between'><span>就診數量</span><span>{state.visitsNum}</span></div>
                        </li>
                    </ul>
                </div>
                <div className='row mt-3'>
                    <div className='col-md-4'>
                        <div className="mb-3 card" style={{height:'400px'}}>
                            <div className="card-header p-3">
                                <div className="card-header-title">
                                    全台飼主分布
                                </div>
                            </div>
                            <div className="card-body">
                                <div id="userChart"></div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className="mb-3 card" style={{height:'400px'}}>
                            <div className="card-header p-3">
                                <div className="card-header-title">
                                    就診寵物分布
                                </div>
                            </div>
                            <div className="card-body">
                                <div id="visitedPetChart"></div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className="mb-3 card" style={{height:'400px'}}>
                            <div className="card-header p-3">
                                <div className="card-header-title">
                                    寵物類別
                                </div>
                            </div>
                            <div className="card-body">
                                <div id="speciesChart"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className="mb-3 card" style={{height:'400px'}}>
                        <div className="card-header p-3">
                            <div className="card-header-title">
                                全台獸醫院分布
                            </div>
                        </div>
                        <div className="card-body">
                            <div id="chart"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Dashboard;