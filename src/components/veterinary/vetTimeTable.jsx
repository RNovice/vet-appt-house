// 假資料
const data = [
  {
    "VeterinaryId": 4387,
    "UserId": null,
    "City": "高雄市",
    "LicenceNumber": "高市建獸醫字第7號",
    "LicenceType": "獸醫師",
    "LicenceDate": "19761230",
    "Status": "開業",
    "Name": "萬祥犬專科醫院",
    "OwnName": "邱子鈴",
    "Tel": "07-2274387",
    "Address": "高雄市新興區民生一路196號",
    "CreateTime": "2025-02-19T09:00:00",
    "UpdateTime": "2025-02-19T09:00:00",
    "DataSource": "X資料開放平台",
    "PriorityOrder": 0,
    "Enabled": 1,
    "BusinessHour": {
        "一": "09:00-12:00 14:00-17:00 休",
        "二": "09:00-12:00 14:00-17:00 19:00-22:00",
        "三": "09:00-12:00 14:00-17:00 休",
        "四": "09:00-12:00 14:00-17:00 19:00-22:00",
        "五": "09:00-12:00 14:00-17:00 19:00-22:00",
        "六": "09:00-12:00 休 19:00-22:00",
        "日": "09:00-12:00 14:00-17:00 休"
    },
    "WebSite": null,
    "EmergencyDepartment": "沒有急診",
    "Views": 1200,
    "WebTitle": null,
    "IsEmergencyDepartment": true,
    "Summary": null,
    "Keyword": null
  },
  {
    "VeterinaryId": 5078,
    "UserId": null,
    "City": "苗栗縣",
    "LicenceNumber": "苗縣獸師開字第103040號",
    "LicenceType": "獸醫師",
    "LicenceDate": "20180914",
    "Status": "開業",
    "Name": "全民動物醫院",
    "OwnName": "莊詔勛",
    "Tel": "(037)464875",
    "Address": "苗栗縣竹南鎮博愛街120號",
    "CreateTime": "2019-07-06T22:58:49.317",
    "UpdateTime": "2019-08-26T22:49:31.2",
    "DataSource": "X資料開放平台",
    "PriorityOrder": 0,
    "Enabled": 1,
    "BusinessHour": {
      "一": "09:00-12:00 休 14:00-17:00 19:00-22:00",
      "二": "09:00-12:00 14:00-17:00 休 19:00-22:00",
      "三": "09:00-12:00 14:00-17:00 19:00-22:00",
      "四": "09:00-12:00 休 14:00-17:00 19:00-22:00",
      "五": "09:00-12:00 14:00-17:00 19:00-22:00",
      "六": "休 14:00-17:00 19:00-22:00",
      "日": "09:00-12:00 14:00-17:00 休"
    },
    "WebSite": "http://www.no1vet.com.tw/",
    "EmergencyDepartment": null,
    "Views": 10651,
    "WebTitle": null,
    "IsEmergencyDepartment": true,
    "Summary": null,
    "Keyword": null
  },
  {
    "VeterinaryId": 5054,
    "UserId": null,
    "City": "臺北市",
    "LicenceNumber": "北市獸業字第140號",
    "LicenceType": "獸醫師",
    "LicenceDate": "20181128",
    "Status": "開業",
    "Name": "仁慈動物醫院",
    "OwnName": "朱浚源",
    "Tel": "(02)25336983",
    "Address": "臺北市中山區北安路458巷19號",
    "CreateTime": "2019-07-06T22:58:49.077",
    "UpdateTime": "2019-08-26T22:36:16.19",
    "DataSource": "X資料開放平台",
    "PriorityOrder": 0,
    "Enabled": 1,
    "BusinessHour": {
      "一": "09:00-12:00 14:00-17:00 19:00-22:00",
      "二": "09:00-12:00 14:00-17:00 休 19:00-22:00",
      "三": "09:00-12:00 14:00-17:00 19:00-22:00",
      "四": "09:00-12:00 休 14:00-17:00 19:00-22:00",
      "五": "09:00-12:00 14:00-17:00 19:00-22:00",
      "六": "休 14:00-17:00 19:00-22:00",
      "日": "09:00-12:00 14:00-17:00 休"
    },
    "WebSite": null,
    "EmergencyDepartment": "急診電話:0935578571",
    "Views": 5326,
    "WebTitle": null,
    "IsEmergencyDepartment": true,
    "Summary": null,
    "Keyword": null
  },
  {
    "VeterinaryId": 5115,
    "UserId": null,
    "City": "宜蘭縣",
    "LicenceNumber": "宜府農畜字第1070066548號",
    "LicenceType": "獸醫師",
    "LicenceDate": "20180521",
    "Status": "開業",
    "Name": "維倫斯動物醫院",
    "OwnName": "林雍翔",
    "Tel": "(039)353550",
    "Address": "宜蘭縣宜蘭市中山路三段157號",
    "CreateTime": "2019-07-06T22:58:49.667",
    "UpdateTime": "2019-08-25T01:36:12.827",
    "DataSource": "X資料開放平台",
    "PriorityOrder": 0,
    "Enabled": 1,
    "BusinessHour": {
      "一": "09:00-12:00 休 14:00-17:00 19:00-22:00",
      "二": "09:00-12:00 14:00-17:00 休 19:00-22:00",
      "三": "09:00-12:00 14:00-17:00 19:00-22:00",
      "四": "09:00-12:00 休 14:00-17:00 19:00-22:00",
      "五": "09:00-12:00 14:00-17:00 19:00-22:00",
      "六": "休 14:00-17:00 19:00-22:00",
      "日": "09:00-12:00 14:00-17:00 休"
    },
    "WebSite": null,
    "EmergencyDepartment": "小夜急診至凌晨12點",
    "Views": 4199,
    "WebTitle": null,
    "IsEmergencyDepartment": true,
    "Summary": null,
    "Keyword": null
  },
  {
    "VeterinaryId": 5116,
    "UserId": null,
    "City": "高雄市",
    "LicenceNumber": "高市獸師開字第326號",
    "LicenceType": "獸醫師",
    "LicenceDate": "2018/05/17",
    "Status": "開業",
    "Name": "聯盟旗楠動物醫院",
    "OwnName": "陳薪弘",
    "Tel": "07-3535918",
    "Address": "高雄市楠梓區旗楠路106號",
    "CreateTime": "2019-07-06T22:58:49.677",
    "UpdateTime": "2019-08-25T01:39:01.81",
    "DataSource": "X資料開放平台",
    "PriorityOrder": 0,
    "Enabled": 1,
    "BusinessHour": {
      "一": "09:00-12:00 14:00-17:00 19:00-22:00",
      "二": "09:00-12:00 14:00-17:00 休 19:00-22:00",
      "三": "09:00-12:00 14:00-17:00 19:00-22:00",
      "四": "09:00-12:00 休 14:00-17:00 19:00-22:00",
      "五": "09:00-12:00 14:00-17:00 19:00-22:00",
      "六": "休 14:00-17:00 19:00-22:00",
      "日": "09:00-12:00 14:00-17:00 休"
    },
    "WebSite": "https://www.pet100pa.com/index.php/vet",
    "EmergencyDepartment": "夜間急診 23:00-02:00",
    "Views": 4664,
    "WebTitle": null,
    "IsEmergencyDepartment": true,
    "Summary": null,
    "Keyword": null
  },
  {
    "VeterinaryId": 5130,
    "UserId": null,
    "City": "臺北市",
    "LicenceNumber": "北市獸業字第491號",
    "LicenceType": "獸醫師",
    "LicenceDate": "2018/03/21",
    "Status": "開業",
    "Name": "南京太僕動物醫院",
    "OwnName": "曾鴻章",
    "Tel": "02-27562005",
    "Address": "臺北市南京東路5段286號1樓及B1",
    "CreateTime": "2019-07-06T22:58:49.82",
    "UpdateTime": "2019-08-26T00:37:13.177",
    "DataSource": "X資料開放平台",
    "PriorityOrder": 0,
    "Enabled": 1,
    "BusinessHour": {
      "一": "09:00-12:00 14:00-17:00 19:00-22:00",
      "二": "09:00-12:00 14:00-17:00 休 19:00-22:00",
      "三": "09:00-12:00 14:00-17:00 19:00-22:00",
      "四": "09:00-12:00 休 14:00-17:00 19:00-22:00",
      "五": "09:00-12:00 14:00-17:00 19:00-22:00",
      "六": "休 14:00-17:00 19:00-22:00",
      "日": "09:00-12:00 14:00-17:00 休"
    },
    "WebSite": "http://topvet.topet.net/",
    "EmergencyDepartment": "24H夜間急診：0985-699633",
    "Views": 3679,
    "WebTitle": null,
    "IsEmergencyDepartment": true,
    "Summary": null,
    "Keyword": null
  },
  {
    "VeterinaryId": 5174,
    "UserId": null,
    "City": "臺中市",
    "LicenceNumber": "中市獸醫開字第105218號",
    "LicenceType": "獸醫師",
    "LicenceDate": "20171214",
    "Status": "開業",
    "Name": "大敦寵物醫院",
    "OwnName": "戴更基",
    "Tel": "(04)23200208",
    "Address": "臺中市西區精誠一街2號",
    "CreateTime": "2019-07-06T22:58:50.197",
    "UpdateTime": "2019-08-26T13:05:23.28",
    "DataSource": "X資料開放平台",
    "PriorityOrder": 0,
    "Enabled": 1,
    "BusinessHour": {
      "一": "09:00-12:00 14:00-17:00 19:00-22:00",
      "二": "09:00-12:00 14:00-17:00 休 19:00-22:00",
      "三": "09:00-12:00 14:00-17:00 19:00-22:00",
      "四": "09:00-12:00 休 14:00-17:00 19:00-22:00",
      "五": "09:00-12:00 14:00-17:00 19:00-22:00",
      "六": "休 14:00-17:00 19:00-22:00",
      "日": "09:00-12:00 14:00-17:00 休"
    },
    "WebSite": null,
    "EmergencyDepartment": "夜間急診服務，需預約。",
    "Views": 1821,
    "WebTitle": null,
    "IsEmergencyDepartment": true,
    "Summary": null,
    "Keyword": null
  },
  {
    "VeterinaryId": 5210,
    "UserId": null,
    "City": "屏東縣",
    "LicenceNumber": "屏獸開字第124號",
    "LicenceType": "獸醫師",
    "LicenceDate": "2017/11/15",
    "Status": "開業",
    "Name": "毛小孩動物醫院",
    "OwnName": "謝國基",
    "Tel": "08-7512022",
    "Address": "屏東縣屏東市仁愛路7號",
    "CreateTime": "2019-07-06T22:58:50.53",
    "UpdateTime": "2019-08-25T01:31:42.17",
    "DataSource": "X資料開放平台",
    "PriorityOrder": 0,
    "Enabled": 1,
    "BusinessHour": {
      "一": "09:00-12:00 14:00-17:00 19:00-22:00",
      "二": "09:00-12:00 14:00-17:00 休 19:00-22:00",
      "三": "09:00-12:00 14:00-17:00 19:00-22:00",
      "四": "09:00-12:00 休 14:00-17:00 19:00-22:00",
      "五": "09:00-12:00 14:00-17:00 19:00-22:00",
      "六": "休 14:00-17:00 19:00-22:00",
      "日": "09:00-12:00 14:00-17:00 休"
    },
    "WebSite": null,
    "EmergencyDepartment": "夜間急診門診從晚上10:00至凌晨2:00",
    "Views": 9998,
    "WebTitle": null,
    "IsEmergencyDepartment": true,
    "Summary": null,
    "Keyword": null
  }
]

const VetTimeTable = () => {
    return (
        <>
            <div className="vetTimeTable primary-blue-5">
            <div className="timeTable-L d-flex flex-column justify-content-center align-items-center" >
                <div className="VeterinaryInfo d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex align-items-center mb-4 m-50-5"><img src="./src/assets/images/veterinary/vetlogo.png" alt="vetlogo.png" className="mr-8 vetlogo" />
                <span className="text-secondary roboto fz-32 lh-15 fw-400">萬祥</span><span className="text-primary-blue-4 roboto fz-32 lh-15 fw-400">犬專科醫院</span></div>
                <span className="lh-15 fz-20 mb-4 roboto fw-400">高雄市新興區民生一路196號</span>
                <div className="mb-4 d-flex align-items-center">
                    <img src="../src/assets/images/veterinary/icon.png" className="phoneIcon mr-20" alt="phone icon" />
                    <h5 className="text-secondary roboto fz-32 lh-38-4 fw-600">07-227-4387</h5>
                </div>
                </div>
                <span className="lh-22 fz-14 mt-auto text-disabled roboto fw-400">高市建獸醫字第7號</span>
            </div>
            <div className="timeTable-R pt-4">
                <table className="table" style={{"--bs-table-bg":"transparent"}}>
                <thead>
                    <tr className="fz-20 lh-15 roboto h-60 text-center borderBottom-1">
                    <td scope="col" className=""></td>
                    <td scope="col" className="pb-4">一</td>
                    <td scope="col" className="pb-4">二</td>
                    <td scope="col" className="pb-4">三</td>
                    <td scope="col" className="pb-4">四</td>
                    <td scope="col" className="pb-4">五</td>
                    <td scope="col" className="pb-4">六</td>
                    <td scope="col" className="pb-4">日</td>
                    </tr>
                </thead>
                <tbody>
                    <tr className="fz-20 lh-15 h-60 text-center roboto borderBottom-1">
                    <td className="pt-4">09:00-12:00</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">休</td>
                    </tr>
                    <tr className="fz-20 lh-15 h-60 text-center roboto borderBottom-1">
                    <td className="pt-4 ">14:00-17:00</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">休</td>
                    <td className="pt-4">休</td>
                    </tr>
                    <tr className="fz-20 lh-15 h-60 text-center roboto">
                    <td className="pt-4">19:00-22:00</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">休</td>
                    <td className="pt-4">休</td>
                    </tr>
                </tbody>
                </table>
            </div>
            </div>
        </>
    );
};

export default VetTimeTable;