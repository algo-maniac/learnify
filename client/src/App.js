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
import Instructors from "./components/Instructors";
import ExamCorner from "./components/ExamCorner";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AuthContext from "./store/auth-context";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import Admin from "./pages/Admin";

function App() {
  const [userdata, setUserdata] = useState(() => {
    const storedUserData = localStorage.getItem('userdata');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  const fetchUserdata = async () => {
    try {
      const token = localStorage.getItem('token');

      if(!token) return;
      
      const role = jwtDecode(token).role;
      const requestRoute = `${role}/get${role.charAt(0).toUpperCase() + role.slice(1)}Data`
      const data = await fetch(`http://localhost:8000/${requestRoute}`, {
        method: 'GET',
        headers: {
          "authorization": token
        },
      });

      if (data.ok) {
        const newUserdata = await data.json();

        setUserdata(newUserdata);
        localStorage.setItem('userdata', JSON.stringify(newUserdata));
      } else {
        console.error('Error fetching user data');
      }
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  }

  useEffect(() => {
    if (!userdata) {
      if(localStorage.getItem("token"))
        fetchUserdata();
    }
  });

  const contextValue = {
    userdata,
    setUserdata,
    fetchUserdata,
  };

  return (
    <>
      <AuthContext.Provider value={contextValue}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/doubt" element={<Doubt />}></Route>
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/Random" element={<Random />} />
          <Route path="/home" element={<HomepageTeacher />} />
          {userdata && userdata.role === 'teacher' && (
            <Route path="/live" element={<LiveStream />}/>
          )}
          <Route path="/adminpanel" element={<Admin />} />
          <Route path="/uploadvideo" element={<UploadVideo/>} />
          <Route path="/instructors" element={<Instructors/>} />
          <Route path="/instructor/:id" element={<HomepageTeacher />} />
          <Route path="/exam-corner" element={<ExamCorner />} />
        </Routes>
        <Footer />
      </AuthContext.Provider>
    </>
  );
}

export default App;
