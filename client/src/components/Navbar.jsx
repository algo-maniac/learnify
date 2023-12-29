import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import "./Navbar.css";
import { Avatar } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AuthContext from "../store/auth-context";

function Navbar(props) {
  const { userdata, setUserdata, fetchUserdata } = useContext(AuthContext);
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userdata');
    sessionStorage.removeItem('profileImage');
    setUserdata(null);
    Navigate("/");
  }
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    if(!userdata) {
      setImageSrc("");
      return;
    }

    if(sessionStorage.getItem('profileImage')) {
      setImageSrc(sessionStorage.getItem('profileImage'));
      return;
    }
    
    const imageUrl = `http://localhost:3000/image/${userdata.profileImage}`; // Replace <ObjectId> with the actual ObjectId

    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const objectURL = URL.createObjectURL(blob);
        setImageSrc(objectURL);
        sessionStorage.setItem("profileImage", objectURL);
      })
      .catch(error => console.error('Error fetching image:', error));
  }, [userdata]); 

  return (
    <div className="navbar">
      <Link to="/">
      <div className="navbar_branding">
        <img
          src="/learnify_logo.png"
          alt=""
          className="navbar_logo"
          style={{ backgroudColor: "white", width: "70px", height: "70px" }}
        />
        <h1
          style={{letterSpacing: "2px" }}
        >
          Learnify
        </h1>
      </div>
      </Link>

      {userdata && (
        <div className="login_details">

          <div className="navbar_right">
            <div className="navbar_options">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                {userdata && userdata.role === 'teacher' && (
                  <li>
                    <Link exact to={"/teacher/" + userdata.id}>
                      Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <Link exact to="/doubt">
                    Doubt
                  </Link>
                </li>
                <li>
                  <Link exact to="/teachers">
                    Teachers
                  </Link>
                </li>
                <li>
                  <Link exact to="/exam-corner">
                    Exam-Corner
                  </Link>
                </li>
                <li>
                  <Link exact to="/">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="login_details">
            <div className="userdetails">
              <p>{userdata.username}</p>
              <Avatar src={imageSrc} sx={{ width: 50, height: 50 }} />
            </div>
            <button
            onClick={logout}
            className="btn"
            style={{
              borderRadius: "30px 30px 30px 30px",
              // borderLeft: "2px solid black",
              // borderRight: "2px solid black",
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "white",
                paddingLeft: "15px",
                paddingRight: "15px",
                fontSize: "16px",
              }}
            >
              Logout
            </Link>
          </button>
          </div>
        </div>
      )}
      {!userdata && (
        <div className="login_signup">
          <button className="btn" style={{ borderRight: "2px solid black" }}>
            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                color: "white",
                paddingLeft: "5px",
              }}
            >
              Sign Up
            </Link>
          </button>
          <button
            className="btn"
            style={{
              borderRadius: "0px 30px 30px 0px",
              borderLeft: "2px solid black",
            }}
          >
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "white",
                paddingRight: "15px",
                fontSize: "16px",
              }}
            >
              Login
            </Link>
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
