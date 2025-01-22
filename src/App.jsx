import ToastNotification from "./components/common/ToastNotification";
import AppRoutes from "./router/AppRoutes";

function App() {
  return (
    <>
      <AppRoutes />
      <ToastNotification />
    </>
  );
}

export default App;
