import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, useNavigate, useRoutes } from "react-router-dom";
import styled from "styled-components";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Instructor from "./pages/Instructor";
import LiveStream from "./pages/LiveStream.jsx";
import Navbar from "./components/Navbar";
import LeftMenu from "./components/LeftMenu";
import UploadVideo from "./pages/UploadVideo";
import Doubt from "./components/Doubt";
import Instructors from "./pages/Instructors";
import ExamCorner from "./components/ExamCorner";
import Home2 from "./pages/Home2";
import Search from "./pages/Search";
import CreateCourseForm from "./pages/CreateCourseForm.jsx";
import AuthContext from "./store/auth-context";
import { jwtDecode } from "jwt-decode";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Video from "./pages/Video";
import Videos from "./pages/Videos";
import EditCourseForm from "./pages/EditCourseForm.jsx";
import Course from "./pages/Course";
import Courses from "./pages/Courses";
import EditableCourses from "./pages/EditableCourses.jsx";
import EditableVideos from "./pages/EditableVideos.jsx";
import PurchasedCourses from "./pages/PurchasedCourses.jsx";
import EnrolledCourses from "./pages/EnrolledCourses.jsx";
import {
  LoggedOutProtected,
  SignupLoginProtected,
  AdminProtected,
  InstructorProtected,
} from "./ProtectedRoutes.jsx";

function App() {
  console.log("----------------------------------------------------------------")
  console.log(process.env);
  console.log(process.env.REACT_APP_API_URL);
  console.log("----------------------------------------------------------------")
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState(() => {
    const storedUserData = localStorage.getItem("userdata");
    return storedUserData ? JSON.parse(storedUserData) : null;
  });
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(
    window.innerWidth <= 786 ? false : true
  );

  const history = useNavigate();

  const handleSearchClick = () => {
    // Navigate to the search page
    history("/search");
  };
  const toggleIsSearchExpanded = () => {
    console.log("clilcked");
    setIsSidebarExpanded((prev) => !prev);
    console.log(isSidebarExpanded);
  };

  const fetchUserdata = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const role = jwtDecode(token).role;
      const requestRoute = `${role}/get${
        role.charAt(0).toUpperCase() + role.slice(1)
      }Data`;
      const data = await fetch(`${process.env.REACT_APP_BASE_URL}/${requestRoute}`, {
        method: "GET",
        headers: {
          authorization: token,
        },
      });

      if (data.ok) {
        const newUserdata = await data.json();
        console.log(newUserdata);
        setUserdata(newUserdata);
        localStorage.setItem("userdata", JSON.stringify(newUserdata));
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const logout = (e) => {
    console.log(e);
    localStorage.removeItem("token");
    localStorage.removeItem("userdata");
    setUserdata(null);
    navigate("/");
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        const { exp } = jwtDecode(storedToken);
        if (Date.now() > exp * 1000) {
          logout();
        } else {
          if (!userdata) {
            if (localStorage.getItem("token")) fetchUserdata();
          }
        }
      }
    };

    checkTokenExpiration();
  }, []);

  const contextValue = {
    userdata,
    setUserdata,
    fetchUserdata,
    isSidebarExpanded,
    logout
  };

  const routes = useRoutes([
    {
      path: '/',
      element: <Home2 handleSearchClick={handleSearchClick}/>
    },
    {
      path: "/signup",
      element: (
        <Routes>
          <Route element={<LoggedOutProtected />}>
            <Route path="/" element={<SignUp/>} />
          </Route>
        </Routes>
      ),
    },
    {
      path: "/login",
      element: (
        <Routes>
          <Route element={<LoggedOutProtected />}>
            <Route path="/" element={<LogIn/>} />
          </Route>
        </Routes>
      ),
    },
    {
      path: "/*",
      element: (
        <>
          <NavbarContainer>
            <Navbar
              toggleIsSearchExpanded={toggleIsSearchExpanded}
              handleSearchClick={handleSearchClick}
            />
          </NavbarContainer>

          <LeftMenuConainer isSidebarExpanded={isSidebarExpanded}>
            <LeftMenu
              isSidebarExpanded={isSidebarExpanded}
              setIsSidebarExpanded={setIsSidebarExpanded}
            />
          </LeftMenuConainer>

          <Content isSidebarExpanded={isSidebarExpanded}>
            <Routes>
              {/* <Route path="/Random" element={<Random />} /> */}

              <Route path="/doubt-corner" element={<Doubt />}></Route>

              <Route element={<SignupLoginProtected />}>
                <Route path="/live" element={<LiveStream />} />
                <Route path="/search" element={<Search />} />

                <Route path="/video" element={<Videos />} />
                <Route path="/video/:id" element={<Video />} />

                <Route path="/instructor" element={<Instructors />} />
                <Route path="/instructor/:id" element={<Instructor />} />

                <Route path="/course" element={<Courses />} />
                <Route path="/course/:courseId" element={<Course />} />
                <Route path="/enrolled-course" element={<EnrolledCourses />} />
                <Route path="/purchased-course" element={<PurchasedCourses />} />

                <Route path="/exam-corner" element={<ExamCorner />} />
              </Route>

              <Route element={<InstructorProtected />}>
                <Route path="/home" element={<Instructor />} />
                <Route path="/upload-video" element={<UploadVideo />} />
                <Route path="/edit-video" element={<EditableVideos />} />
                <Route path="/edit-course" element={<EditableCourses />} />
                <Route path="/create-course" element={<CreateCourseForm />} />
                <Route
                  path="/course/:courseId/edit"
                  element={<EditCourseForm />}
                />
              </Route>

              <Route element={<AdminProtected />}>
                <Route path="/dashboard-admin" element={<AdminDashboard />} />
              </Route>
            </Routes>
            <Overlay
              isSidebarExpanded={isSidebarExpanded}
              onClick={toggleIsSearchExpanded}
            />
          </Content>
        </>
      ),
    },
  ]);

  return (
    <>
      <AuthContext.Provider value={contextValue}>{routes}</AuthContext.Provider>
    </>
  );
}

export default App;

const NavbarContainer = styled.div`
  position: fixed;
  width: 100vw;
  top: 0;
  right: 0;
  z-index: 1000;
`;

const LeftMenuConainer = styled.div`
  width: ${({ isSidebarExpanded }) => (isSidebarExpanded ? "260px" : "65px")};
  background-color: #333;
  transition: width 0.3s;

  @media (max-width: 786px) {
    display: ${({ isSidebarExpanded }) =>
      isSidebarExpanded ? "block" : "none"};
    /* width: ${({ isSidebarExpanded }) =>
      isSidebarExpanded ? "100%" : "0"}; */
    overflow-x: hidden;
  }
`;

const Content = styled.div`
  padding-left: ${({ isSidebarExpanded }) =>
    isSidebarExpanded ? "260px" : "65px"};
  padding-top: 70px;
  background-color: #eeeded;
  transition: padding-left 0.3s;
  position: relative;

  @media (max-width: 786px) {
    padding-left: 0;
  }
`;

const Overlay = styled.div`
  display: none;

  @media (max-width: 786px) {
    display: ${({ isSidebarExpanded }) =>
      isSidebarExpanded ? "block" : "none"};
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
  margin-left: ${({ isSidebarExpanded }) =>
    isSidebarExpanded ? "260px" : "65px"};
  position: sticky;
  top: 100vh;
  transition: margin-left 0.3s;

  @media (max-width: 786px) {
    padding-left: 0;
  }
`;
