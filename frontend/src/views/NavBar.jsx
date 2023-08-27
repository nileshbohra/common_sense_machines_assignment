import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/isAuthenticated";
import { logout } from "../controllers/auth.controller";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export default function NavBar() {
  const [checkAuth, setCheckAuth] = React.useState(false);
  const location = useLocation();

  useEffect(() => {
    setCheckAuth(isAuthenticated());
  }, [checkAuth, location]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/`);
  };

  const handleLogout = () => {
    logout((err, data) => {
      if (!!err) {
        toast.error(err.response.data.status);
      } else {
        toast.success("Logout Success");
        setCheckAuth(false);
        navigate(`/login`);
      }
    });
  };

  return (
    <div className="flex items-center justify-between w-screen h-12 bg-black px-10">
      <h1
        className="flex items-center justify-center gap-3 text-white text-center cursor-pointer"
        onClick={handleClick}
      >
        <i className="material-icons">cloud</i>
        CloudUpload
      </h1>
      {checkAuth && (
        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
}
