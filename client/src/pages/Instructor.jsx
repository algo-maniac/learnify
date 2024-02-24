import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
// import './Instructor.css'
import TeacherDetails from "../components/TeacherDetails";
import VideoCard from "../components/VideoCard";
import AuthContext from "../store/auth-context";

function Instructor() {
  const { userdata } = useContext(AuthContext);
  const { id } = useParams();

  const [instructordata, setInstructorData] = useState();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const getInstructorData = async () => {
    const data = await fetch(
      `${process.env.REACT_APP_BASE_URL}/instructor/getInstructor/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    const json = await data.json();
    console.log(json.instructor);
    setInstructorData(json.instructor);
    setIsSubscribed(json.isSubscribed);
    setIsOwner(json.isOwner);
    // console.log(json);
  };

  useEffect(() => {
    try {
      getInstructorData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Container className="homepage">
      <div className="contentt">
        <div className="instructorDetails">
          {instructordata && (
            <TeacherDetails
              instructordata={instructordata}
              isSubscribed={isSubscribed}
              setIsSubscribed={setIsSubscribed}
              isOwner={isOwner}
              setInstructorData={setInstructorData}
            />
          )}
        </div>
      </div>
    </Container>
  );
}

export default Instructor;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  /* margin: 20px; */

  .homepage {
    margin: 0;

    /* padding: 100px; */
  }

  .sidebar {
    width: 30%;
    background-color: #a9b9da;
  }

  .contentt {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .contentt > * {
    width: 100%;
  }

  .videos {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 30px;
  }

  /* .videos > * {
    width: calc(33.333% - 20px);
  } */

  .navbar_branding {
    display: flex;
    align-items: center;
    background-color: rgb(210, 210, 210);
    color: #2b3467;
    padding: 10px;
  }

  .navbar_logo {
    width: 100px;
  }

  .about-page {
    width: 100%;
    /* margin: auto; */
    /* margin-top: 0.7rem; */
    /* font-family: "Roboto", sans-serif; */
    padding: 20px 30px;
  }

  .about-page .about-desc h3 {
    font-size: 1.35rem;
    font-weight: 550;
    height: fit-content;
    margin: 0px;
  }

  .about-page .links img {
    position: static;
    width: 1.5rem;
  }
  .about-page .links {
    margin-top: 0.4rem;
  }
  .about-page .links .link {
    display: flex;
    flex-direction: row;
    margin-bottom: 0.5rem;
  }
  .about-page .links .link .icon-image {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    margin-right: 1rem;
  }
  .about-page .links .link .icon-info .icon-header {
    height: fit-content;
  }
  .about-page .links .link .icon-info h5 {
    font-weight: 500;
    font-family: "Roboto", sans-serif;
    margin-bottom: 0px;
    font-size: 1rem;
  }
  .about-page .links .link .icon-info a {
    font-size: 0.8rem;
    /* color: #485fc7; */
  }
  .about-page .links .link .icon-info svg {
    font-size: 0.8rem;
  }
  /* Videos page css */
  .videos-page {
    background-color: white;
    padding: 20px 30px;
  }

  /* Courses css */

  .course-container {
    width: 100%;
    background-color: white;
    padding: 20px 30px;
    /* margin: auto; */
    /* margin-top: 0.7rem; */
    /* font-family: "Roboto",sans-serif; */
  }
  .course-container .header-text h6 {
    font-weight: 400;
    color: rgb(77, 76, 76);
  }
  /* CSS */
  .button-61 {
    align-items: center;
    appearance: none;
    background-color: #4a56b8;
    border-radius: 0.375em;
    box-shadow: none;
    box-sizing: border-box;
    color: #ffffff;
    cursor: pointer;
    margin-left: 0.7rem;
    display: inline-flex;
    font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Helvetica,
      Arial, sans-serif;
    font-size: 0.85rem;
    height: 2.8em;
    justify-content: center;
    line-height: 1.5;
    padding: calc(0.5em - 1px) 1em;
    position: relative;
    padding-left: 1.3rem;
    padding-right: 1.3rem;
    text-align: center;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: top;
    white-space: nowrap;
  }

  .button-61:active {
    border-color: #4a4a4a;
    outline: 0;
  }

  .button-61:focus {
    border-color: #485fc7;
    outline: 0;
  }

  .button-61:hover {
    background-color: rgb(71, 89, 206);
  }

  .button-61:focus:not(:active) {
    box-shadow: rgba(72, 95, 199, 0.25) 0 0 0 0.125em;
  }
  .courses-list {
    width: 100%;
    display: flex;
    flex-direction: row;
    height: 100%;
    flex-wrap: wrap;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 30px;
  }

  /* .courses-list > * {
    width: calc(33.333% - 20px);
  } */
  .courses-list .courses {
    /* margin-right: 1rem;
      margin-bottom: 1rem; */
    /* width: ; */
  }
  .courses-list .courses .level {
    font-weight: 700;
    background: -webkit-linear-gradient(90deg, #6980b5, #3f469d, blue);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .courses-list .courses .price {
    font-weight: 700;
    color: black;
  }
  .courses-list .courses .desc {
    padding: 0px;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
  }
  .courses-list .courses .tag {
    background-color: black;
    color: white;
    text-transform: none;
    font-size: 0.72rem;
    margin: 0.1rem;
  }
  .courses-list .courses .box1 {
    height: fit-content;
  }
  /* css for home page */
  .home-page {
    display: flex;
    width: 100%;
    flex-direction: column;
    background-color: white;
    padding: 20px 30px;
  }

  .home-page .header1 {
    display: flex;
    font-family: "Roboto", sans-serif;
    align-items: center;
    flex-direction: row;
  }
  .home-page .header1 h5 {
    font-weight: 600;
    /* color: rgb(57, 57, 173); */
  }
  .home-page .line1 {
    border: 1px solid rgb(192, 191, 189);
    width: 2%;
    margin-right: 0.34rem;
  }
  .home-page .line2 {
    width: 90%;
    margin-left: 0.34rem;
    border: 1px solid rgb(192, 191, 189);
  }
`;
