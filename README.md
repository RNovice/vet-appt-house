# 預獸屋 (Vet Appointment House)

## Package Installation
```sh
npm install
```

## Development
```sh
npm run dev
```

## Demo
- **Demo 頁面（示範網站）**: https://rnovice.github.io/vet-appt-house/
- **介紹影片（YouTube 連結）**: https://youtu.be/6PRK3V9kg3U

## Login Credentials
### 使用者（可管理預約紀錄、寵物資料等）
- **帳號**: `mary@example.com`
- **密碼**: `12345678`

### 管理者（可訪問後台 Dashboard 並管理院所）
- **帳號**: `admin@example.com`
- **密碼**: `12345678`

## Mock API
本專案使用 JSON Server，部署於 Render 免費方案。
啟動時需等待 Render 伺服器喚醒（約 1 分鐘）。

### `.env` 設定
請在專案根目錄建立 `.env` 檔案，並加入以下變數：

#### 預設後端網址
```sh
VITE_BACKEND_HOST = https://vet-appt-house-backend.onrender.com
```

#### 備用後端網址
```sh
VITE_BACKEND_HOST = https://vet-appt-house-api.onrender.com
```

#### 本地測試
可自行啟動 [後端專案](https://github.com/RNovice/vet-appt-house-backend) 進行本地測試。
```sh
VITE_BACKEND_HOST = http://localhost:3000
```