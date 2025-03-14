import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from "../services/api";
import axios from 'axios';
import { useForm } from "react-hook-form";
import Icon from "@/components/common/Icon";
import "@/assets/styles/Dashboard.scss";
import Pagination from "../components/common/PaginatorAdmin";

const VetManagementPage = () => {
    const navigate = useNavigate();
    const [clinicData, setClinicData] = useState([]);
    const [filterClinicData, setFilterClinicData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [clinicPerPage, setClinicPerPage] = useState(10)
    const [totalPages, setTotalPages] = useState(1);
    const [pageIndex, setPageIndex] = useState(0);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const getClinicData = async () => {
        try {
            const { data } = await api(`/vetClinics`);
            setClinicData(data);
            setTotalPages(Math.ceil(data.length/10))
        } catch (err) {
            err.response?.data?.error === "Not found"
            ? navigate("/404")
            : console.error("Error: ", err);
        }
    };

    const handlePageChange = (currentPage) => {
        console.log("handlePageChange currentPage", currentPage)
        const lastClinicIndex = currentPage * clinicPerPage;
        const firstClinicIndex = lastClinicIndex-clinicPerPage;
        const currentClinic = clinicData.slice(firstClinicIndex, lastClinicIndex)
        console.log("currentClinic: ",currentClinic)
        setFilterClinicData(currentClinic)
    }

    useEffect(()=>{
        getClinicData();
    },[])
    
    const handleStatus = async(id, data) => {
        const status = !data.isEnabled?'enable':'disable';
        try{
            await axios.patch(`https://vet-appt-house-backend.onrender.com/vetClinics/${id}/${status}`)
        }catch(error){
            console.log("handleStatus Error: ", error)
        };
        getClinicData();
        handlePageChange(currentPage);
        setPageIndex(currentPage);
    }

    const onSubmit = (data) => {
        if (!Array.isArray(clinicData)) {
            console.error("clinicData 非陣列", clinicData);
            return;
        }
        
        const filterData = clinicData.filter(clinic => 
        clinic?.name?.includes(data.vetName || "")
        );

        setFilterClinicData(filterData);
        setTotalPages(Math.ceil(filterData.length/10));
    }
    return (
        <div className="row p-4 mt-3">
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)} className='d-flex justify-content-end'>
                    <div className='d-flex align-items-center gap-2'>
                        <input
                        type="text"
                        id="find-vet-keyword"
                        className={`input-text-primary mb-2 shadow keyword`}
                        defaultValue='請輸入醫院名稱'
                        {...register("vetName")}
                    />

                    <button
                        className="btn-quaternary fs-6 d-flex justify-content-center align-items-center gap-1"
                        type="submit"
                        >
                        搜尋
                        <Icon fileName={"search"} size={20} />
                    </button>
                    </div>
                </form>

                <table className="table mt-5" style={{ "--bs-table-bg": "transparent" }}>
                    <thead>
                        <tr className='fs-4'>
                            <th scope="col" style={{width:'20%'}}>名稱</th>
                            <th scope="col" style={{width:'20%'}}>縣市</th>
                            <th scope="col" style={{width:'20%'}}>地區</th>
                            <th scope="col" style={{width:'20%'}}>是否啟用</th>
                            <th scope="col" style={{width:'20%'}}>編輯</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterClinicData?.length?filterClinicData.map((data) => {
                            return (
                                <tr key={data.id} className='fs-5'>
                                    <td>{data.name}</td>
                                    <td>{data.city}</td>
                                    <td>{data.district}</td>
                                    <td>{data.isEnabled ? (<span className="text-success">啟用</span>) : (<span>未啟用</span>)}</td>
                                    <td>
                                        <button type="button" onClick={()=>handleStatus(data.id,data)}  className="btn btn-outline-primary me-2" disabled={data.isEnabled}>啟用</button>
                                        <button type="button" onClick={()=>handleStatus(data.id,data)} className="btn btn-outline-danger" disabled={!data.isEnabled}>停用</button>
                                    </td>
                                </tr>
                                )
                        }):clinicData.slice(0,10)?.map((data) => {
                            return (
                                <tr key={data.id} className='fs-5'>
                                    <td>{data.name}</td>
                                    <td>{data.city}</td>
                                    <td>{data.district}</td>
                                    <td>{data.isEnabled ? (<span className="text-success">啟用</span>) : (<span>未啟用</span>)}</td>
                                    <td>
                                        <button type="button" onClick={()=>handleStatus(data.id,data)}  className="btn btn-outline-primary me-2" disabled={data.isEnabled}>啟用</button>
                                        <button type="button" onClick={()=>handleStatus(data.id,data)} className="btn btn-outline-danger" disabled={!data.isEnabled}>停用</button>
                                    </td>
                                </tr>
                                )
                        })}
                    </tbody>
                </table>    

                <Pagination
                totalPages={clinicData.length}
                clinicPerPage={clinicPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                handlePageChange = {handlePageChange}
                pageIndex = {pageIndex}
                setPageIndex = {setPageIndex} 
            />
            </div>

        </div>     
    )
}

export default VetManagementPage;