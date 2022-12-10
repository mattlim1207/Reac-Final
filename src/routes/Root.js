import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Root(props) {
  return (
    <div className="container">
      <Outlet />

      <ToastContainer/>
    </div>
  );
}
