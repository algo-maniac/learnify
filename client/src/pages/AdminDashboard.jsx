import GroupIcon from "@mui/icons-material/Group";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import VideocamIcon from "@mui/icons-material/Videocam";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import RequestBox from "../components/RequestBox";
import styled from "styled-components";

function AdminDashboard() {
  return (
    <Container>
      <div className="outer">
        <div className="right-dashboard">
          <div className="header">
            <div className="header-left">
              <h2>Dashboard</h2>
            </div>
            <div className="header-right">
              <h3>
                <span>Home </span>/ Admin
              </h3>
            </div>
          </div>
          <div className="statistics-container">
            <div className="box">
              <div className="left-part">
                <h4>User Count</h4>
                <h3>100</h3>
                <span>
                  <ArrowUpwardIcon /> 5%
                  <span className="text"> (since last week) </span>
                </span>
              </div>
              <div className="right-part" id="user-icon">
                <GroupIcon />
              </div>
            </div>
            <div className="box">
              <div className="left-part">
                <h4>Playlists</h4>
                <h3>8</h3>
                <span>
                  <ArrowUpwardIcon /> 15%
                  <span className="text"> (since last week) </span>
                </span>
              </div>
              <div className="right-part" id="playlist-icon">
                <PlaylistAddIcon />
              </div>
            </div>
            <div className="box">
              <div className="left-part">
                <h4>Watch Time</h4>
                <h3>80 hours</h3>
                <span>
                  <ArrowUpwardIcon /> 5%
                  <span className="text"> (since last week) </span>
                </span>
              </div>
              <div className="right-part" id="video-icon">
                <VideocamIcon />
              </div>
            </div>
            <div className="box">
              <div className="left-part">
                <h4>Pending Request</h4>
                <h3>30</h3>
                <span>
                  <ArrowUpwardIcon /> 20%
                  <span className="text"> (since last week) </span>
                </span>
              </div>
              <div className="right-part" id="request-icon">
                <MapsUgcIcon />
              </div>
            </div>
          </div>
          <RequestBox />
        </div>
      </div>
    </Container>
  );
}

export default AdminDashboard;

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700");
  .outer {
    display: flex;
    flex-direction: row;
  }
  /* .left-dashboard {
    border: 1px solid black;
    min-width: 16vw;
    min-height: 90vh;
    background-color: #0d0d0d;
  }
  .left-dashboard .dashboard-box a {
    box-shadow: rgba(93, 93, 93, 0.2) 0px 2px 8px 0px;
  }
  .left-dashboard ul li:hover {
    background-color: rgb(45, 44, 44);
  } */
  /* css for right part content part */
  .right-dashboard {
    background-color: rgb(250, 250, 250);
    /* min-width: 84vw; */
    width: 100%;
    height: 100vh;
    display: flex;
    overflow: auto;
    flex-direction: column;
  }
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    min-height: 10vh;
    font-family: "Bungee Shade", sans-serif;
    font-family: "Kanit", sans-serif;
    font-family: "Poppins", sans-serif;
    font-family: "Roboto Slab", serif;
    font-family: "Rubik", sans-serif;
    font-family: "Ubuntu", sans-serif;
  }
  .header .header-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .header .header-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .header .header-right h3 {
    font-weight: 700;
    font-size: 1.1rem;
  }
  .header .header-right span {
    color: rgb(57, 57, 226);
  }
  .header .header-right h3 {
    color: rgb(132, 132, 132);
  }
  .header h2 {
    color: rgb(132, 132, 132);
    font-weight: 700;
    font-size: 1.6rem;
  }
  .statistics-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    min-height: 20vh;
    max-height: 40vh;
  }
  .statistics-container .box {
    margin-top: auto;
    margin-bottom: auto;
    width: 18vw;
    min-height: 15vh;
    max-height: 17vh;
    box-sizing: border-box;
    padding: 0.9rem;
    box-shadow: rgba(87, 87, 87, 0.2) 0px 2px 8px 0px;
  }
  .statistics-container .box {
    display: flex;
    border-radius: 5px;
    justify-content: space-around;
    background-color: rgb(255, 255, 255);
    flex-direction: row;
  }
  .statistics-container .box .left-part {
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
  }
  .video-icon svg {
    color: green;
  }
  .statistics-container .box .left-part h4 {
    font-size: 1rem;
    font-weight: 800;
    margin-bottom: 3px;
    color: rgb(136, 136, 136);
  }
  .box .left-part h3 {
    font-weight: 800;
    font-size: 1.6rem;
    margin-bottom: 3px;
  }

  .box .left-part span {
    color: rgb(43, 214, 43);
    font-weight: 600;
    font-size: 0.7rem;
  }
  .box .left-part svg {
    font-size: 1.1rem;
  }
  .box .left-part .text {
    color: gray;
  }
  .statistics-container .box .right-part {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .statistics-container .box .right-part svg {
    font-size: 2.7rem;
  }
  #user-icon svg {
    color: rgb(43, 43, 222);
  }
  #playlist-icon svg {
    color: rgb(17, 189, 17);
  }
  #video-icon svg {
    color: rgb(18, 166, 212);
  }
  #request-icon svg {
    color: rgb(255, 166, 0);
  }
  .dashboard-box {
    position: relative;
    top: 0;
    bottom: 0;
    height: 100vh;
    left: 0;
    overflow: hidden;
    box-shadow: 0 20px 35px rgba(0, 0, 0, 0.1);
  }
  .dashboard-box .logo {
    text-align: center;
    display: flex;
    margin: 10px 0 0 10px;
  }
  .dashboard-box .logo img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
  .dashboard-box .logo span {
    font-weight: bold;
    color: whitesmoke;
    padding-left: 15px;
    font-size: 18px;
    text-transform: uppercase;
  }
  .dashboard-box a {
    position: relative;
    font-size: 14px;
    display: table;
    width: 280px;
    padding: 10px;
  }
  .dashboard-box .fas {
    position: relative;
    width: 70px;
    height: 40px;
    top: 14px;
    font-size: 20px;
    text-align: center;
  }
  .dashboard-box .nav-item {
    position: relative;
    top: 12px;
    margin-left: 10px;
  }
  .dashboard-box .logout {
    position: absolute;
    bottom: 0;
  }
`;
