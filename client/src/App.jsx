import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import styled from 'styled-components';
import LogIn from "./pages/LogIn";
import Random from "./pages/Random";
import Random2 from "./pages/Random2";
import SignUp from "./pages/SignUp";
import HomepageTeacher from "./components/HomepageTeacher";
import LiveStream from "./components/LiveStream";
import Navbar from "./components/Navbar";
import LeftMenu from "./components/LeftMenu";
import UploadVideo from "./components/UploadVideo";
import Doubt from "./components/Doubt";
import Instructors from "./components/Instructors";
import ExamCorner from "./components/ExamCorner";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Search from "./pages/Search";
import CreateCourseForm from "./components/CreateCourseForm";
import AuthContext from "./store/auth-context";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import Admin from "./pages/Admin";
import Video from "./pages/Video";
import EditCourseForm from "./components/EditCourseForm";

function App() {
  const [userdata, setUserdata] = useState(() => {
    const storedUserData = localStorage.getItem('userdata');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)
  const toggleIsSearchExpanded = () => {
    console.log('clilcked');
    setIsSidebarExpanded(prev => !prev);
    console.log(isSidebarExpanded);
  }

  const fetchUserdata = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) return;

      const role = jwtDecode(token).role;
      const requestRoute = `${ role }/get${ role.charAt(0).toUpperCase() + role.slice(1) }Data`
      const data = await fetch(`http://localhost:8000/${ requestRoute }`, {
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
      if (localStorage.getItem("token"))
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
        <NavbarContainer>
          <Navbar toggleIsSearchExpanded={toggleIsSearchExpanded} />
        </NavbarContainer>

        <LeftMenuConainer isSidebarExpanded={isSidebarExpanded}>
          <LeftMenu isSidebarExpanded={isSidebarExpanded} pageId={1} setIsSidebarExpanded={setIsSidebarExpanded}/>
        </LeftMenuConainer>

        <Content  isSidebarExpanded={isSidebarExpanded}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/doubt" element={<Doubt />}></Route>
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/LogIn" element={<LogIn />} />
            <Route path="/Random" element={<Random />} />
            <Route path="/home" element={<HomepageTeacher />} />
            {userdata && userdata.role === 'teacher' && (
              <Route path="/live" element={<LiveStream />} />
            )}
            <Route path="/video/:id" element={<Video />} />
            <Route path="/adminpanel" element={<Admin />} />
            <Route path="/uploadvideo" element={<UploadVideo />} />
            <Route path="/instructors" element={<Instructors />} />
            <Route path="/instructor/:id" element={<HomepageTeacher />} />
            <Route path="/video/:id" element={<Random2 />} />
            <Route path="/exam-corner" element={<ExamCorner />} />
            <Route path="/course/create" element={<CreateCourseForm />} />
            <Route path="/course/:courseId/edit" element={<EditCourseForm />} />
            <Route path="/search" element={<Search />} />
          </Routes> 
          <Overlay isSidebarExpanded={isSidebarExpanded} onClick={toggleIsSearchExpanded} />
        </Content>

        {/* <FooterContainer isSidebarExpanded={isSidebarExpanded}>
          <Footer />
        </FooterContainer> */}
      </AuthContext.Provider>
    </>
  );
}

export default App;

const NavbarContainer = styled.div`
  position: fixed;
  width: 100vw;
  top: 0;
  right: 0;
  z-index: 10000;
`

const LeftMenuConainer = styled.div`
  width: ${({ isSidebarExpanded }) => (isSidebarExpanded ? "260px" : "65px")};
  background-color: #333;
  transition: width 0.3s;

  @media (max-width: 600px) {
    display: ${({ isSidebarExpanded }) => (isSidebarExpanded ? "block" : "none")};
    /* width: ${({ isSidebarExpanded }) => (isSidebarExpanded ? "100%" : "0")}; */
    overflow-x: hidden;
  }
`;

const Content = styled.div`
  padding-left: ${({ isSidebarExpanded }) => (isSidebarExpanded ? "260px" : "65px")};
  padding-top: 70px;
  background-color: #eeeded;
  transition: padding-left 0.3s;
  position: relative;

  @media (max-width: 600px) {
    padding-left: 0;
  }
`;

const Overlay = styled.div`
  display: none;

  @media (max-width: 600px) {
    display: ${({ isSidebarExpanded }) => (isSidebarExpanded ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
  }
`;

const FooterContainer = styled.div`
  margin-left: ${({ isSidebarExpanded }) => (isSidebarExpanded ? "260px" : "65px")};
  position: sticky;
  top: 100vh;
  transition: margin-left 0.3s;

  @media (max-width: 600px) {
    padding-left: 0;
  }
`;

