import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Random from "./pages/Random";
import SignUp from "./pages/SignUp";
import React, { useEffect, useState } from "react";

function App() {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    isLogged: false,
    isTeacher: false,
  });
  useEffect(() => {
    console.log(userData);
  }, [userData]);
  return (
    <>
      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        <Route
          path="/LogIn"
          element={<LogIn userData={userData} setUserData={setUserData} />}
        />
        <Route path="/Random" element={<Random />} />
      </Routes>
    </>
  );
}

export default App;
