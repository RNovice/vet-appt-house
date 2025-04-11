import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import Icon from "../common/Icon";
import axios from "axios";
import { toast } from "react-toastify";
import * as bootstrap from "bootstrap";
import { useAppState } from "@/context/AppStateContext";
const BACKEND_SIGNIN = import.meta.env.VITE_BACKEND_SIGNIN;
const BACKEND_UPLOAD = import.meta.env.VITE_BACKEND_UPLOAD;
const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST;

function PetsModal({ speciesData, modalType, petData, userId, getPetsData }) {
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);
  const modalRef = useRef(null);
  const [showImageError, setShowImageError] = useState(false);
  const { setPageLoading } = useAppState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: petData?.name || "",
      specieId: petData?.specieId || "",
      birthday: petData?.birthday || "",
      weight: petData?.weight || "",
      bloodType: petData?.bloodType || "",
      gender: petData?.gender || "",
      isLigated: petData?.isLigated
        ? "true"
        : petData?.isLigated === false
        ? "false"
        : null,
      hasChip: petData?.hasChip
        ? "true"
        : petData?.hasChip === false
        ? "false"
        : null,
      updateTime: petData?.updateTime || "",
      imageUrl: petData?.imageUrl || "",
    },
    mode: "onChange", // 在欄位值變更時就進行驗證
  });

  /**
   * Modal
   */
  useEffect(() => {
    const modalElement = document.getElementById("petsModal");
    if (modalElement) {
      modalRef.current = modalElement;

      // 只監聽關閉事件
      modalElement.addEventListener("hidden.bs.modal", handleModalClose);

      // 清除事件監聽器
      return () => {
        modalElement.removeEventListener("hidden.bs.modal", handleModalClose);
      };
    }
  }, []); // 只在組件掛載時執行一次

  // 當 petData 變更時，更新表單數據
  useEffect(() => {

    if (petData) {
      // 如果是編輯模式且有 petData，則設置表單數據
      setShowImageError(false);

      // 使用 setValue 逐個更新表單字段
      setValue("name", petData.name || "");
      setValue("specieId", petData.specieId ? String(petData.specieId) : ""); // 確保 specieId 是字符串類型
      setValue("birthday", petData.birthday || "");
      setValue("weight", petData.weight || "");
      setValue("bloodType", petData.bloodType || "");
      setValue("gender", petData.gender || "");
      setValue(
        "isLigated",
        petData.isLigated
          ? "true"
          : petData.isLigated === false
          ? "false"
          : null
      );
      setValue(
        "hasChip",
        petData.hasChip ? "true" : petData.hasChip === false ? "false" : null
      );
      setValue("updateTime", petData.updateTime || "");

      // 如果有圖片，設置圖片
      if (petData.imageUrl) {
        setUploadedImage(petData.imageUrl);
      }
    } else {
      // 如果是新增模式，重置表單
      reset({
        name: "",
        specieId: "",
        birthday: "",
        weight: "",
        bloodType: "",
        gender: "",
        isLigated: null,
        hasChip: null,
        updateTime: "",
        imageUrl: "",
      });
      setUploadedImage(null);
    }
  }, [petData, setValue, reset]); // 當 petData 變化時執行

  // 處理Modal關閉事件
  const handleModalClose = () => {
    if (modalType === "new") {
      // 重置表單
      reset({
        name: "",
        specieId: "",
        birthday: "",
        weight: "",
        bloodType: "",
        gender: "",
        isLigated: null,
        hasChip: null,
        updateTime: "",
        imageUrl: "",
      });

      // 清除上傳的圖片
      setUploadedImage(null);
    }

    // 重置文件輸入元素
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // 重置圖片錯誤提示狀態
    setShowImageError(false);

    // 關閉模態窗口
    if (modalRef.current) {
      const bsModal = bootstrap.Modal.getInstance(modalRef.current);
      if (bsModal) {
        bsModal.hide();
      }
    }
  };

  /**
   * 表單
   */
  // 監聽表單值的變化
  const formValues = watch();

  // 計算年齡
  const birthday = watch("birthday");
  const calculateAge = (birthday) => {
    if (!birthday) return "";

    const today = new Date();
    const _birthday = new Date(birthday);
    let age = today.getFullYear() - _birthday.getFullYear();
    const monthDiff = today.getMonth() - _birthday.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < _birthday.getDate())
    ) {
      age--;
    }
    return `${age} 歲`;
  };

  // 當生日變更時，自動計算年齡
  useEffect(() => {
    if (birthday) {
      calculateAge(birthday);
    }
  }, [birthday]);

  const isFormValid = () => {
    // 檢查必填欄位是否都已填寫
    const requiredFields = [
      "name",
      "specieId",
      "birthday",
      "weight",
      "bloodType",
      "gender",
      "isLigated",
      "hasChip",
    ];
    const hasAllRequired = requiredFields.every((field) => !!formValues[field]);

    // 如果有驗證錯誤，表單不能提交
    const hasErrors = Object.keys(errors).length > 0;

    return hasAllRequired && !hasErrors;
  };

  const uploadImage = async () => {
    let rtnImageUrl = "";
    try {
      // 1.登入取得token
      const loginResponse = await axios.post(BACKEND_SIGNIN, {
        username: "prostyliu@gmail.com",
        password: "prostyliu",
      });

      const { token } = loginResponse.data;

      // 2.上傳圖片
      // 將 base64 字符串轉換為 Blob 對象
      const base64Response = await fetch(uploadedImage);
      const blob = await base64Response.blob();
      const imgFormData = new FormData();
      imgFormData.append("file", blob, "pet_image.jpg");

      const uploadResponse = await axios.post(BACKEND_UPLOAD, imgFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`,
        },
      });

      rtnImageUrl = uploadResponse.data.imageUrl;
    } catch {
      console.error("圖片上傳過程中發生錯誤");
      toast.error("圖片上傳失敗");
    }

    return rtnImageUrl;
  };

  const onSubmit = async (data) => {

    // 檢查必填欄位是否都已填寫
    if (!isFormValid()) {
      return;
    }

    // 檢查是否上傳了圖片
    if (!uploadedImage) {
      setShowImageError(true);
      return;
    }

    // 禁用提交按鈕，防止重複提交
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
    }

    // 顯示全局加載指示器
    setPageLoading(true);

    try {
      let rtnImageUrl = "";
      // 如果圖片沒有變更,則不進行圖片上傳
      if (modalType !== "new" && petData.imageUrl === uploadedImage) {
        rtnImageUrl = petData.imageUrl;
      } else {
        rtnImageUrl = await uploadImage();
      }
      //圖片上傳失敗
      if (!rtnImageUrl) {
        toast.error("圖片上傳失敗");
        return;
      }

      // 獲取當前時間
      const currentTime = new Date().toISOString();
      // 提交寵物新增與修改
      const formData = {
        name: data.name,
        specieId: Number(data.specieId),
        gender: data.gender,
        birthday: data.birthday,
        isLigated: data.isLigated === "true",
        hasChip: data.hasChip === "true",
        weight: Number(data.weight),
        bloodType: data.bloodType,
        imageUrl: rtnImageUrl,
        userId: userId,
      };
      if (modalType === "new") {
        // 新增時設置創建時間
        formData.createTime = currentTime;
        formData.updateTime = currentTime;
        await axios.post(`${BACKEND_HOST}/pets`, formData);
        toast.success("寵物資料新增成功");
        // 關閉Modal
        handleModalClose();
        // 刷新寵物列表
        getPetsData();
      } else {
        formData.createTime = petData.createTime;
        // 修改時只更新更新時間
        formData.updateTime = currentTime;
        await axios.put(
          `${BACKEND_HOST}/pets/${petData.id}`,
          formData
        );
        toast.success("寵物資料更新成功");
        // 關閉Modal
        handleModalClose();
        // 刷新寵物列表
        getPetsData();
      }
    } catch {
      toast.error(
        modalType === "new" ? "寵物資料新增失敗" : "寵物資料更新失敗"
      );
    } finally {
      // 隱藏全局加載指示器
      setTimeout(() => {
        setPageLoading(false);
      }, 1000);

      // 恢復提交按鈕
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  };

  /**
   * 圖片上傳
   */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      // Check file size <= 10MB
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("檔案大小超過 10MB 或未選擇檔案");
    }
  };

  const handleUploadClick = (e) => {
    // 阻止事件冒泡
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      console.error("File input ref is null");
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation(); // 防止觸發父元素的點擊事件
    setUploadedImage(null); // 清除上傳的圖片

    // 重置文件輸入元素的值，這樣即使選擇同一個文件也會觸發 onChange 事件
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <div
        className="modal fade petsModal"
        id="petsModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="petModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-header">
                <h5 className="modal-title fs-5" id="petModalLabel">
                  {modalType === "new" ? "新增寵物資料" : "修改寵物資料"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                {/* 照片 */}
                <div className="row mb-4">
                  <div className="col">
                    <input
                      type="file"
                      ref={(e) => {
                        fileInputRef.current = e;
                      }}
                      className="d-none"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={handleFileChange}
                      name="petImage"
                    />
                    <label className="form-label">照片</label>
                    {uploadedImage ? (
                      <div
                        className="position-relative"
                        style={{ width: "120px", height: "120px" }}
                        onClick={handleUploadClick}
                        role="button"
                        tabIndex={0}
                      >
                        <img
                          src={uploadedImage}
                          alt="Uploaded"
                          className="w-100 h-100 object-fit-cover rounded-3"
                        />
                        <div
                          className="position-absolute bottom-0 w-100 d-flex justify-content-center align-items-center"
                          style={{
                            height: "40px",
                            background: "rgba(0, 0, 0, 0.8)",
                            borderRadius: "0 0 8px 8px",
                          }}
                        >
                          <Icon
                            fileName={"camera"}
                            size={24}
                            className="text-white"
                          />
                        </div>
                        <span
                          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary btn-close p-1"
                          onClick={handleRemoveImage}
                          role="button"
                          aria-label="Remove image"
                        >
                          <span className="visually-hidden">移除圖片</span>
                        </span>
                      </div>
                    ) : (
                      <div>
                        <div
                          className="upload-area"
                          onClick={handleUploadClick}
                        >
                          <div className="mb-2">
                            <Icon fileName={"upload"} size={33} />
                          </div>
                          <p className="mb-2">
                            請將檔案拖曳到此 或是
                            <span className="fw-bold">瀏覽選擇檔案</span>
                          </p>
                          <p className="text-muted">檔案大小不超過 10 MB</p>
                        </div>
                        {showImageError && (
                          <div className="text-danger small mt-1">
                            請上傳寵物照片
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {/* ====== */}
                <div className="row mb-4">
                  {/* 姓名 */}
                  <div className="col-sm-6">
                    <div className="mb-4">
                      <label className="form-label required-field">姓名</label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.name ? "is-invalid" : ""
                        }`}
                        placeholder="請填入姓名"
                        {...register("name", {
                          required: "姓名為必填欄位",
                          minLength: {
                            value: 2,
                            message: "姓名至少需要2個字元",
                          },
                          maxLength: {
                            value: 10,
                            message: "姓名不能超過10個字元",
                          },
                        })}
                      />
                      {errors.name && (
                        <div className="invalid-feedback">
                          {errors.name.message}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* 品種 */}
                  <div className="col">
                    <div className="mb-4">
                      <label className="form-label required-field">品種</label>
                      <select
                        className={`form-select ${
                          errors.specieId ? "is-invalid" : ""
                        }`}
                        {...register("specieId", { required: "請選擇品種" })}
                      >
                        <option value="" disabled>
                          請選擇品種
                        </option>
                        {speciesData.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.species}
                          </option>
                        ))}
                      </select>
                      {errors.specieId && (
                        <div className="invalid-feedback">
                          {errors.specieId.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* ====== */}
                <div className="row mb-4">
                  {/* 生日 */}
                  <div className="col-sm-6">
                    <div className="mb-4">
                      <label className="form-label required-field">生日</label>
                      <div className="input-group">
                        <input
                          type="date"
                          className={`form-control ${
                            errors.birthday ? "is-invalid" : ""
                          }`}
                          placeholder="請選擇日期"
                          {...register("birthday", {
                            required: "生日為必填欄位",
                            validate: {
                              notInFuture: (value) => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                const selectedDate = new Date(value);
                                return (
                                  selectedDate <= today || "生日不能是未來日期"
                                );
                              },
                              notTooOld: (value) => {
                                const twentyYearsAgo = new Date();
                                twentyYearsAgo.setFullYear(
                                  twentyYearsAgo.getFullYear() - 20
                                );
                                const selectedDate = new Date(value);
                                return (
                                  selectedDate >= twentyYearsAgo ||
                                  "生日日期似乎過早，請確認"
                                );
                              },
                            },
                          })}
                        />
                        {errors.birthday && (
                          <div className="invalid-feedback">
                            {errors.birthday.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* 年齡 */}
                  <div className="col">
                    <div className="mb-4">
                      <label className="form-label">年齡</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="依據生日自動計算"
                        value={birthday ? calculateAge(birthday) : ""}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                {/* ====== */}
                <div className="row mb-4">
                  {/* 體重 */}
                  <div className="col-sm-6">
                    <div className="mb-4">
                      <label className="form-label required-field">體重</label>
                      <div className="input-group">
                        <input
                          type="number"
                          step="0.1"
                          className={`form-control ${
                            errors.weight ? "is-invalid" : ""
                          }`}
                          placeholder="請填入體重"
                          {...register("weight", {
                            required: "體重為必填欄位",
                            min: { value: 0.1, message: "體重必須大於0" },
                            max: {
                              value: 100000,
                              message: "體重不能超過100000g",
                            },
                            validate: {
                              isNumber: (value) =>
                                !isNaN(value) || "請輸入有效的數字",
                            },
                          })}
                        />
                        <span className="input-group-text">g</span>
                        {errors.weight && (
                          <div className="invalid-feedback">
                            {errors.weight.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* 血型 */}
                  <div className="col">
                    <div className="mb-4">
                      <label className="form-label required-field">血型</label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.bloodType ? "is-invalid" : ""
                        }`}
                        placeholder="請填入血型"
                        {...register("bloodType", {
                          required: "為必填欄位",
                        })}
                      />
                    </div>
                  </div>
                </div>
                {/* ====== */}
                <div className="row mb-4">
                  {/* 性別 */}
                  <div className="col-sm-6">
                    <div className="mb-4">
                      <label className="form-label required-field">性別</label>
                      <select
                        className={`form-select ${
                          errors.gender ? "is-invalid" : ""
                        }`}
                        {...register("gender", { required: "請選擇性別" })}
                      >
                        <option value="">請選擇性別</option>
                        <option value="male">公</option>
                        <option value="female">母</option>
                      </select>
                      {errors.gender && (
                        <div className="invalid-feedback">
                          {errors.gender.message}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* 是否已結紮 */}
                  <div className="col">
                    <div className="mb-4">
                      <label className="form-label required-field">是否已結紮</label>
                      <div className="text-grey-scale-2 mt-2">
                        <div className="form-check form-check-inline lh-15">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="neutered-yes"
                            value="true"
                            {...register("isLigated", {
                              required: "請選擇是否已結紮",
                            })}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="neutered-yes"
                          >
                            是
                          </label>
                        </div>
                        <div className="form-check form-check-inline lh-15">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="neutered-no"
                            value="false"
                            {...register("isLigated", {
                              required: "請選擇是否已結紮",
                            })}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="neutered-no"
                          >
                            否
                          </label>
                        </div>
                        {errors.isLigated && (
                          <div className="text-danger small">
                            {errors.isLigated.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* ====== */}
                <div className="row mb-4">
                  <div className="col-sm-6">
                    <label className="form-label required-field">是否插入晶片</label>
                    <div className="text-grey-scale-2 mt-2">
                      <div className="form-check form-check-inline lh-15">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="chip-yes"
                          value="true"
                          {...register("hasChip", {
                            required: "請選擇是否插入晶片",
                          })}
                        />
                        <label className="form-check-label" htmlFor="chip-yes">
                          是
                        </label>
                      </div>
                      <div className="form-check form-check-inline lh-15">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="chip-no"
                          value="false"
                          {...register("hasChip", {
                            required: "請選擇是否插入晶片",
                          })}
                        />
                        <label className="form-check-label" htmlFor="chip-no">
                          否
                        </label>
                      </div>
                      {errors.hasChip && (
                        <div className="text-danger small">
                          {errors.hasChip.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col d-flex justify-content-end align-items-end">
                    <p className="text-grey-scale-3">
                      資料更新日期：2025/01/31
                    </p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light px-4 rounded-pill"
                  data-bs-dismiss="modal"
                  onClick={handleModalClose}
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="btn btn-dark px-4 rounded-pill"
                  disabled={!isFormValid()}
                >
                  {modalType === "new" ? "新增" : "修改"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PetsModal;
