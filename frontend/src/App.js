import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Gallery from "./views/Gallery";
import Subscription from "./views/Subscription";
import NavBar from "./views/NavBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/gallery/:id" element={<Gallery />} />
        <Route path="/subscription/:id" element={<Subscription />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
