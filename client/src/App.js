import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Random from "./pages/Random";
import SignUp from "./pages/SignUp";
import React, { useEffect, useState } from "react";
import "./App.css";
import HomepageTeacher from "./components/HomepageTeacher";
import LiveStream from "./components/LiveStream";
import Navbar from "./components/Navbar";
import UploadVideo from "./components/UploadVideo";
import Doubt from "./components/Doubt";
import Teachers from "./components/Teachers";
import ExamCorner from "./components/ExamCorner";
import Footer from "./components/Footer";
function App() {
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    username: "",
    isLogged: false,
    isTeacher: false,
  });
  // const [drive, SetDrive] = useState({ googleDrive: "/http://google.drive./" });
  useEffect(() => {
    console.log(userData);
  }, [userData]);
  return (
    <>
      <Navbar userData={userData} />
      <Routes>
        <Route path="/doubt" element={<Doubt />}></Route>
        <Route path="/SignUp" element={<SignUp />} />
        <Route
          path="/LogIn"
          element={<LogIn userData={userData} setUserData={setUserData} />}
        />
        <Route path="/Random" element={<Random />} />
        <Route path="/home" element={<HomepageTeacher />} />
        {userData.isLogged && (
          <Route
            path="/live"
            element={<LiveStream username={userData.username} />}
          />
        )}
        <Route path="/uploadvideo" element={<UploadVideo data={userData} />} />
        <Route
          path="/teachers"
          element={
            <Teachers
              isLogged={userData.isLogged}
              isTeacher={userData.isTeacher}
              id={userData.id}
            />
          }
        />
        <Route
          path="/teacher/:userID"
          element={<HomepageTeacher userData={userData} />}
        />
        <Route path="/exam-corner" element={<ExamCorner />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
