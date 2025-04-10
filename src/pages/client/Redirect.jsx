import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CatLoading from "@/components/common/CatLoading";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import api from "../../services/api";

const Redirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLogin, user } = useAuth();

  useEffect(() => {
    const handleGeolocation = (onSuccess, onError) => {
      if (!navigator.geolocation) {
        toast("瀏覽器不支援定位", {
          className: "toast-error",
          toastId: "geolocation-error",
        });
        navigate("/");
        return;
      }
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    };

    const fetchLocationData = async (lat, lng) => {
      const { data } = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=zh-TW`
      );
      return {
        city:
          data.address?.city ||
          data.address?.town ||
          data.address?.village ||
          "",
        district:
          data.address?.suburb ||
          data.address?.borough ||
          data.address?.city_district ||
          "",
      };
    };

    const redirectToNearby = () => {
      handleGeolocation(
        async (position) => {
          try {
            const { city, district } = await fetchLocationData(
              position.coords.latitude,
              position.coords.longitude
            );
            navigate(`/search/result?city=${city}&area=${district}`);
          } catch {
            toast("位置查閱失敗", {
              className: "toast-error",
              toastId: "geolocation-error",
            });
            navigate("/");
          }
        },
        () => {
          toast("瀏覽器無法定位", {
            className: "toast-error",
            toastId: "geolocation-error",
          });
          navigate("/");
        }
      );
    };

    const applyLastAppointment = async (userId) => {
      try {
        const { data } = await api(
          `/appointments?userId=${userId}&_expand=pet&_expand=vetClinic&_expand=user`
        );

        if (!data.length) throw new Error("No appointment history");

        const now = new Date();
        const nearest =
          data.reduce((acc, cur) => {
            const appointmentDate = new Date(
              `${cur.appointmentDateTime.split(" ")[0]} ${
                cur.appointmentDateTime.split(" ")[1].split("-")[0]
              }`
            );
            return !acc || (appointmentDate > now && appointmentDate < acc.date)
              ? { ...cur, date: appointmentDate }
              : acc;
          }, null) || data[0];

        toast("已套用上次預約", {
          className: "toast-primary",
          toastId: "quick-query",
        });
        navigate(`/booking?clinicId=${nearest.vetClinicId}`, {
          state: { appointmentData: nearest },
        });
      } catch {
        redirectToRandomClinic();
      }
    };

    const redirectToRandomClinic = () => {
      handleGeolocation(
        async (position) => {
          try {
            const { city, district } = await fetchLocationData(
              position.coords.latitude,
              position.coords.longitude
            );
            const {
              data: { data: clinics },
            } = await api(
              `/vetClinics?limit=20&city=${city}&district=${district}`
            );
            if (!clinics.length) throw new Error("No nearby clinic");

            const selected =
              clinics[Math.floor(Math.random() * clinics.length)];
            toast("已套用附近院所", {
              className: "toast-primary",
              toastId: "quick-query",
            });
            navigate(`/booking?clinicId=${selected.id}`);
          } catch {
            toast("沒有適用的資料", {
              className: "toast-primary",
              toastId: "quick-query-error",
            });
            navigate("/search");
          }
        },
        () => {
          toast("沒有適用的資料", {
            className: "toast-primary",
            toastId: "quick-query-error",
          });
          navigate("/search");
        }
      );
    };

    switch (location.pathname) {
      case "/nearby":
        redirectToNearby();
        break;
      case "/veterinary":
        toast("請指定醫院", { className: "toast-primary" });
        navigate("/search");
        break;
      case "/quick":
        isLogin && user
          ? applyLastAppointment(user.id)
          : redirectToRandomClinic();
        break;
      default:
        navigate("/404");
    }
  }, [location.pathname]);

  return (
    <div className="hv100-nav-n-foot flex-column justify-content-center align-items-center text-tertiary p-1">
      <h3>{location.pathname === "/nearby" ? "查 詢 中" : "頁面重新導向中"}</h3>
      <CatLoading />
    </div>
  );
};

export default Redirect;
