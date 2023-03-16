import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { Avatar } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Navbar(props) {
  console.log(props);
  return (
    <div className="navbar">
      <div className="navbar_branding">
        {/* <img
          src="/learnify_logo.png"
          alt=""
          className="navbar_logo"
          style={{ backgroudColor: "white" }}
        /> */}
        <h1
          style={{ color: "white", marginLeft: "50px", letterSpacing: "2px" }}
        >
          Learnify
        </h1>
      </div>
      <div className="navbar_right">
        <div className="navbar_options">
          <ul>
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
              <Link exact to="/">
                Courses
              </Link>
            </li>
            <li>
              <Link exact to="/teachers">
                Teachers
              </Link>
            </li>
            <li>
              <Link exact to="/">
                About Us
              </Link>
            </li>
          </ul>
        </div>
        {props.userData.isLogged && (
          <div className="login_details">
            <p>{props.userData.username}</p>
            <Avatar src={props.userData.img} sx={{ width: 50, height: 50 }} />
            <ArrowDropDownIcon />
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
    </div>
  );
}

export default Navbar;
