import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Gallery from "./views/Gallery";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/gallery/:id" element={<Gallery />} />
      </Routes>
    </>
  );
}

export default App;
