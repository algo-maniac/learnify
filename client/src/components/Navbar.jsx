import React from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import "./Navbar.css";
import { Avatar } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Navbar(props) {
  const logout = () => {
    props.setUserData({
      id: "",
      email: "",
      username: "",
      isLogged: false,
      isTeacher: false,
    })
    Navigate("/");
  }


  console.log(props);
  return (
    <div className="navbar">
      <Link to="/">
      <div className="navbar_branding">
        <img
          src="/learnify_logo.png"
          alt=""
          className="navbar_logo"
          style={{ backgroudColor: "white" }}
        />
        <h1
          style={{letterSpacing: "2px" }}
        >
          Learnify
        </h1>
      </div>
      </Link>

      {props.userData.isLogged && (
        <div className="login_details">

          <div className="navbar_right">
            <div className="navbar_options">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                {props.userData.isTeacher && (
                  <li>
                    <Link exact to={"/teacher/" + props.userData.id}>
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
            <p>{props.userData.username}</p>
            <Avatar src={props.userData.img} sx={{ width: 50, height: 50 }} />
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
      {!props.userData.isLogged && (
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
