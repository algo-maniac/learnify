import PersonIcon from "@mui/icons-material/Person";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import InfoIcon from "@mui/icons-material/Info";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";

function Home() {
  const location = useLocation();
  const [state, setState] = useState(location.state);
  useEffect(() => {
    // if (state) {
    //   if (state?.toast) {
    //     toast.success(state?.data, {
    //       position: "top-center",
    //     });
    //   }
    //   setState(null);
    // }
  }, [state]);
  return (
    <Container>
      {/* <ToastContainer /> */}
      <div className="home_background">
        <div className="home">
          <div className="banner">
            <h2>Learning made easy</h2>
          </div>
          <div className="cards">
            <Link to="/teachers">
              <div className="card">
                <PersonIcon sx={{ fontSize: 40 }} />
                <h3>Teachers</h3>
                <p>Follow the most experienced teacher on Learnify</p>
              </div>
            </Link>
            <Link to="/doubt">
              <div className="card">
                <PsychologyAltIcon sx={{ fontSize: 40 }} />
                <h3>Having a Doubt</h3>
                <p>
                  Have any doubt? clear it out instantly with Learnify doubt
                  support
                </p>
              </div>
            </Link>
            <Link to="/exam-corner">
              <div className="card">
                <InfoIcon sx={{ fontSize: 40 }} />
                <h3>Exam Information</h3>
                <p>
                  Get all exam related information in one place. Explore now
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Cutive&family=Kanit:wght@300;400&family=Poppins:wght@300;400;500;600;700&family=Roboto+Slab&family=Rubik:ital,wght@0,400;0,800;1,400&family=Ubuntu:wght@400;500&display=swap");

  .home_background {
    background-image: url(/public/study_background.avif);
    background-size: cover;
  }

  .home {
    min-height: 90vh;
    background-color: black;
    opacity: 0.8;
  }

  .banner {
    width: 100%;
    min-height: 400px;
    display: grid;
    place-content: center;
  }

  .banner > h2 {
    font-size: 4rem;
    color: whitesmoke;
    font-family: Georgia, "Times New Roman", Times, serif;
  }

  .cards > a {
    text-decoration: none;
    color: black;
  }

  .cards > a:hover,
  a:focus {
    text-decoration: none;
  }

  .cards {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding-bottom: 100px;
  }

  .card {
    width: 25vw;
    height: 15vw;
    padding: 10px;
    border: 2px solid black;
    border-radius: 10px;
    background-color: white;
    opacity: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-align: center;
  }

  .card > p {
    font-weight: bolder;
  }

  .login-submit:hover {
    background-color: white;
    color: black;
    cursor: pointer;
  }

  .signup-submit:hover {
    background-color: white;
    color: black;
    cursor: pointer;
  }
  .popup-box {
    position: absolute;
    top: 32%;
    left: 30%;
    border-radius: 5px;
    width: 35vw;
    background-color: rgb(255, 255, 255);
    height: 30vh;
  }
  .popup-box .header {
    height: 20%;
    display: grid;
    border-radius: 5px;
    grid-template-columns: 0.5fr 3fr;
    background-color: rgb(78, 78, 202);
  }
  .popup-box .header div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .popup-box .header .icon svg {
    font-size: 2rem;
    color: white;
  }
  .popup-box .header .text h3 {
    color: whitesmoke;
    font-size: 1.7rem;
    font-family: "Bungee Shade", sans-serif;
    font-family: "Cutive", serif;
    font-family: "Kanit", sans-serif;
    font-family: "Poppins", sans-serif;
    font-family: "Roboto Slab", serif;
    font-family: "Rubik", sans-serif;
    font-family: "Ubuntu", sans-serif;
    font-weight: 750;
  }
  .popup-box .content {
    font-weight: 650;
    max-width: 35vw;
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
  }
  .popup-box .redirect .content-box {
    font-weight: 400;
  }
  /* CSS */
  .button-70 {
    background-image: linear-gradient(#0dccea, #0d70ea);
    border: 0;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.3) 0 5px 15px;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    font-family: Montserrat, sans-serif;
    font-size: 0.9em;
    margin: 5px;
    padding: 5px 25px;
    text-align: center;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }
`;
