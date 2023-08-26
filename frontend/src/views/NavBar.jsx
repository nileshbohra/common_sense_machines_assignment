import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/`);
  };
  return (
    <div className="flex items-center justify-center w-screen h-10 bg-black">
      <h1
        className="flex items-center justify-center gap-3 text-white text-center"
        onClick={handleClick}
      >
        <i class="material-icons">cloud</i>
        CloudUpload
      </h1>
    </div>
  );
}
