// 假資料
const VetTimeTable = () => {

    const data = [{
      "id": 1,
      "city": "苗栗縣",
      "district": "竹南鎮",
      "name": "全民動物醫院",
      "licenseNumber": "苗縣獸師開字第103040號",
      "services": [
        1,
        2,
        4,
        5,
        7,
        8,
        11,
        13,
        14
      ],
      "treatedAnimals": [
        1,
        2,
        4,
        5
      ],
      "businessHours": [
        [
          true,
          true,
          true,
          true,
          true,
          true,
          true
        ],
        [
          true,
          true,
          false,
          true,
          true,
          true,
          true
        ],
        [
          false,
          true,
          true,
          true,
          false,
          true,
          false
        ]
      ],
      "hasEmergency": true,
      "address": "苗栗縣竹南鎮博愛街120號",
      "tel": "037-464875",
      "createTime": "2019-07-06T22:58:49.317",
      "updateTime": "2019-08-26T22:49:31.2",
      "imageUrl": 18,
      "imagesUrl": [
        "https://images.unsplash.com/photo-1576671081741-c538eafccfff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHw3NHx8dmV0ZXJpbmFyeSUyMGNsaW5pY3xlbnwwfHx8fDE3MzczNjEwNDl8MA&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1606431424031-dbdedefc5bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHw0Mzh8fHZldGVyaW5hcnklMjBjbGluaWN8ZW58MHx8fHwxNzM3MzYxMDY2fDA&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1663182106210-2d372c45ed23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHwxNDR8fHZldGVyaW5hcnklMjBjbGluaWN8ZW58MHx8fHwxNzM3MzYxMDUyfDA&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1674049405737-0df6ff767f8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHwyMDV8fHZldGVyaW5hcnklMjBjbGluaWN8ZW58MHx8fHwxNzM3MzYxMDU1fDA&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1682663947087-94157b8e4a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHwzODd8fHZldGVyaW5hcnklMjBjbGluaWN8ZW58MHx8fHwxNzM3MzYxMDY0fDA&ixlib=rb-4.0.3&q=80&w=1080"
      ],
      "hasExoticPetTreat": false,
      "isEnabled": true,
      "isAllDay": false,
      "hasWalkInAppt": true,
      "licenseInfo": {
        "licenseType": "獸醫師",
        "licenseDate": "20180914",
        "ownName": "莊詔勛"
      },
      "HomeVisit": true,
      "hasCallBooking": false,
      "MCParking": true,
      "CarParking": false
    },
    {
      "id": 2,
      "city": "臺北市",
      "district": "中山區",
      "name": "仁慈動物醫院",
      "licenseNumber": "北市獸業字第140號",
      "services": [
        1,
        2,
        3,
        4,
        5,
        7,
        8,
        9,
        13,
        14
      ],
      "treatedAnimals": [
        1,
        2,
        4
      ],
      "businessHours": [
        [
          true,
          true,
          true,
          true,
          false,
          true,
          false
        ],
        [
          true,
          true,
          true,
          true,
          false,
          true,
          false
        ],
        [
          true,
          true,
          true,
          true,
          false,
          true,
          false
        ]
      ],
      "hasEmergency": true,
      "address": "臺北市中山區北安路458巷19號",
      "tel": "022-5336983",
      "createTime": "2019-07-06T22:58:49.077",
      "updateTime": "2019-08-26T22:36:16.19",
      "imageUrl": 8,
      "imagesUrl": [
        "https://images.unsplash.com/photo-1580281658626-ee379f3cce93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHwxMnx8dmV0ZXJpbmFyeSUyMGNsaW5pY3xlbnwwfHx8fDE3MzczNjEwNDd8MA&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1731514740777-6476aae2accf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHwyMjh8fHZldGVyaW5hcnklMjBjbGluaWN8ZW58MHx8fHwxNzM3MzYxMDU2fDA&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1629909613638-0e4a1fad8f81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHwzMzV8fHZldGVyaW5hcnklMjBjbGluaWN8ZW58MHx8fHwxNzM3MzYxMDYyfDA&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHwyOHx8dmV0ZXJpbmFyeSUyMGNsaW5pY3xlbnwwfHx8fDE3MzczNjEwNDd8MA&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1656428964836-78d54bf76231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHw0NjN8fHZldGVyaW5hcnklMjBjbGluaWN8ZW58MHx8fHwxNzM3MzYxMDY4fDA&ixlib=rb-4.0.3&q=80&w=1080"
      ],
      "hasExoticPetTreat": false,
      "isEnabled": true,
      "isAllDay": true,
      "hasWalkInAppt": true,
      "licenseInfo": {
        "licenseType": "獸醫師",
        "licenseDate": "20181128",
        "ownName": "朱浚源"
      },
      "HomeVisit": false,
      "hasCallBooking": false,
      "MCParking": true,
      "CarParking": false
    },
    {
      "id": 3,
      "city": "宜蘭縣",
      "district": "宜蘭市",
      "name": "維倫斯動物醫院",
      "licenseNumber": "宜府農畜字第1070066548號",
      "services": [
        4,
        5,
        8,
        11,
        12,
        14
      ],
      "treatedAnimals": [
        1,
        2,
        4
      ],
      "businessHours": [
        [
          true,
          true,
          true,
          true,
          false,
          true,
          true
        ],
        [
          true,
          true,
          true,
          false,
          false,
          true,
          false
        ],
        [
          true,
          true,
          true,
          true,
          true,
          true,
          true
        ]
      ],
      "hasEmergency": true,
      "address": "宜蘭縣宜蘭市中山路三段157號",
      "tel": "039-353550",
      "createTime": "2019-07-06T22:58:49.667",
      "updateTime": "2019-08-25T01:36:12.827",
      "imageUrl": 17,
      "imagesUrl": [
        "https://images.unsplash.com/photo-1563233987-35f9d4b9a861?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHw0MzN8fHZldGVyaW5hcnklMjBjbGluaWN8ZW58MHx8fHwxNzM3MzYxMDY2fDA&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1643660527088-cfeb71ea4a09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHwzNDl8fHZldGVyaW5hcnklMjBjbGluaWN8ZW58MHx8fHwxNzM3MzYxMDYyfDA&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1690123098181-41104bf9fdd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHwzNjV8fHZldGVyaW5hcnklMjBjbGluaWN8ZW58MHx8fHwxNzM3MzYxMDY0fDA&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1673865641073-4479f93a7776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHwyNDh8fHZldGVyaW5hcnklMjBjbGluaWN8ZW58MHx8fHwxNzM3MzYxMDU4fDA&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1612943733919-f9661f1331f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHwyNTd8fHZldGVyaW5hcnklMjBjbGluaWN8ZW58MHx8fHwxNzM3MzYxMDU4fDA&ixlib=rb-4.0.3&q=80&w=1080"
      ],
      "hasExoticPetTreat": false,
      "isEnabled": true,
      "isAllDay": false,
      "hasWalkInAppt": true,
      "licenseInfo": {
        "licenseType": "獸醫師",
        "licenseDate": "20180521",
        "ownName": "林雍翔"
      },
      "HomeVisit": false,
      "hasCallBooking": false,
      "MCParking": true,
      "CarParking": true
    },
    {
      "id": 4,
      "city": "高雄市",
      "district": "楠梓區",
      "name": "聯盟旗楠動物醫院",
      "licenseNumber": "高市獸師開字第326號",
      "services": [
        1,
        4,
        5,
        6,
        7,
        8,
        12,
        14
      ],
      "treatedAnimals": [
        1,
        2,
        4,
        6
      ],
      "businessHours": [
        [
          true,
          true,
          true,
          true,
          true,
          true,
          false
        ],
        [
          false,
          true,
          true,
          true,
          true,
          true,
          false
        ],
        [
          true,
          true,
          true,
          true,
          false,
          true,
          false
        ]
      ],
      "hasEmergency": true,
      "address": "高雄市楠梓區旗楠路106號",
      "tel": "073-535918",
      "createTime": "2019-07-06T22:58:49.677",
      "updateTime": "2019-08-25T01:39:01.81",
      "imageUrl": 17,
      "imagesUrl": [
        "https://images.unsplash.com/photo-1612276529624-33e7430ebce8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHwyNjl8fHZldGVyaW5hcnklMjBjbGluaWN8ZW58MHx8fHwxNzM3MzYxMDU4fDA&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1559000357-f6b52ddfbe37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHw0NDZ8fHZldGVyaW5hcnklMjBjbGluaWN8ZW58MHx8fHwxNzM3MzYxMDY2fDA&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1654919563185-f752302f7205?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHwyMjd8fHZldGVyaW5hcnklMjBjbGluaWN8ZW58MHx8fHwxNzM3MzYxMDU2fDA&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1551601651-05a4836d25c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHwxMDR8fHZldGVyaW5hcnklMjBjbGluaWN8ZW58MHx8fHwxNzM3MzYxMDUxfDA&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1635243180816-851e937c6c8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHwzMjJ8fHZldGVyaW5hcnklMjBjbGluaWN8ZW58MHx8fHwxNzM3MzYxMDYwfDA&ixlib=rb-4.0.3&q=80&w=1080"
      ],
      "hasExoticPetTreat": false,
      "isEnabled": true,
      "isAllDay": false,
      "hasWalkInAppt": false,
      "licenseInfo": {
        "licenseType": "獸醫師",
        "licenseDate": "2018/05/17",
        "ownName": "陳薪弘"
      },
      "HomeVisit": false,
      "hasCallBooking": true,
      "MCParking": true,
      "CarParking": true
    },
    {
      "id": 5,
      "city": "臺北市",
      "district": null,
      "name": "南京太僕動物醫院",
      "licenseNumber": "北市獸業字第491號",
      "services": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        12,
        14,
        15
      ],
      "treatedAnimals": [
        1,
        2
      ],
      "businessHours": [
        [
          false,
          true,
          true,
          true,
          true,
          true,
          false
        ],
        [
          true,
          true,
          true,
          true,
          false,
          false,
          false
        ],
        [
          false,
          true,
          false,
          true,
          false,
          false,
          true
        ]
      ],
      "hasEmergency": true,
      "address": "臺北市南京東路5段286號1樓及B1",
      "tel": "022-7562005",
      "createTime": "2019-07-06T22:58:49.82",
      "updateTime": "2019-08-26T00:37:13.177",
      "imageUrl": 10,
      "imagesUrl": [
        "https://images.unsplash.com/photo-1642844771937-23accb161a3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHwxMDV8fHZldGVyaW5hcnklMjBjbGluaWN8ZW58MHx8fHwxNzM3MzYxMDUxfDA&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1594819159323-b72124baafaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHw0OTN8fHZldGVyaW5hcnklMjBjbGluaWN8ZW58MHx8fHwxNzM3MzYxMDY5fDA&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1551601651-09492b5468b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHwxMDN8fHZldGVyaW5hcnklMjBjbGluaWN8ZW58MHx8fHwxNzM3MzYxMDUxfDA&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1642845257969-09077e914081?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHwxMzZ8fHZldGVyaW5hcnklMjBjbGluaWN8ZW58MHx8fHwxNzM3MzYxMDUyfDA&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1568930876264-0227875bb047?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHw0NTl8fHZldGVyaW5hcnklMjBjbGluaWN8ZW58MHx8fHwxNzM3MzYxMDY4fDA&ixlib=rb-4.0.3&q=80&w=1080"
      ],
      "hasExoticPetTreat": false,
      "isEnabled": true,
      "isAllDay": false,
      "hasWalkInAppt": false,
      "licenseInfo": {
        "licenseType": "獸醫師",
        "licenseDate": "2018/03/21",
        "ownName": "曾鴻章"
      },
      "HomeVisit": false,
      "hasCallBooking": true,
      "MCParking": true,
      "CarParking": true
    }]

    const result = data[Math.floor(Math.random()*data.length)]

    console.log("result", result)

    return (
        <>
            <div className="vetTimeTable primary-blue-5">
            <div className="timeTable-L d-flex flex-column justify-content-center align-items-center" >
                <div className="VeterinaryInfo d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex align-items-center mb-4 m-50-5"><img src="./src/assets/images/veterinary/vetlogo.png" alt="vetlogo.png" className="mr-8 vetlogo" />
                <span className="text-secondary roboto fz-32 lh-15 fw-400">{result.name.includes('動物醫院')?result.name.slice(0,result.length-4):result.name.includes('寵物醫院')?result.name.slice(0,result.length-4):result.name.includes('犬專科醫院')?result.name.slice(0,result.length-5):result.name.slice(0,result.length-2)}</span><span className="text-primary-blue-4 roboto fz-32 lh-15 fw-400">{result.name.includes('動物醫院')?result.name.slice(result.length-4,result.length):result.name.includes('寵物醫院')?result.name.slice(result.length-4,result.length):result.name.includes('犬專科醫院')?result.name.slice(result.length-5,result.length):result.name.slice(result.length-2,result.length)}</span></div>
                <span className="lh-15 fz-20 mb-4 roboto fw-400">{result.address}</span>
                <div className="mb-4 d-flex align-items-center">
                    <img src="../src/assets/images/veterinary/icon.png" className="phoneIcon mr-20" alt="phone icon" />
                    <h5 className="text-secondary roboto fz-32 lh-38-4 fw-600">{result.tel}</h5>
                </div>
                </div>
                <span className="lh-22 fz-14 mt-auto text-disabled roboto fw-400">{result.licenseNumber}</span>
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