import React, { useEffect, useState, useContext } from "react";

import TeacherCard from "../components/TeacherCard";
import Loader from "../components/Loader";
import AuthContext from "../store/auth-context";
import styled from "styled-components";
function Instructors(props) {
  const [instructors, setInstructors] = useState([]);

  const { userdata, isSidebarExpanded } = useContext(AuthContext);
  console.log(userdata);

  const fetchInstructors = async () => {
    const data = await fetch(`${process.env.REACT_APP_BASE_URL}/instructor`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    const json = await data.json();
    setInstructors(json.instructors);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) fetchInstructors();
  }, []);

  return (
    <Container>
      <div className="teachers">
        <div
          className={`teachercards  ${
            isSidebarExpanded ? "sidebarExpanded" : ""
          }`}
        >
          {instructors &&
            instructors.map((instructor) => (
              <TeacherCard
                id={instructor._id}
                username={instructor.username}
                profileImage={instructor.profileImage}
                socialMediaLinks={instructor.socialMediaLinks}
              />
            ))}
        </div>
      </div>
    </Container>
  );
}

export default Instructors;

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 70px);
  background-color: white;
  padding: 20px 30px;

  .teachers {
    display: flex;
    min-height: calc(100vh - 70px);
    align-items: flex-start;
    /* background-color: #e7e7e7;
    background-color: white; */
  }

  .teachercards {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    gap: 30px;
  }

  .teachercards > * {
    width: calc(20% - 30px);
    /* overflow: hidden; */
  }
  /* 
  .teachercards.sidebarExpanded > * {
    width: calc(33.33% - 24.5px);
  } */

  @media only screen and (max-width: 600px) {
    .teachercards > * {
      width: calc(100%);
    }
  }

  @media only screen and (min-width: 601px) and (max-width: 800px) {
    .teachercards > * {
      width: calc(33.33% - 24.5px);
    }
    /* 
    .teachercards.sidebarExpanded > * {
      width: calc(50% - 15px);
    } */
  }

  @media only screen and (min-width: 801px) and (max-width: 1400px) {
    .teachercards > * {
      width: calc(25% - 24.5px);
    }

    .teachercards.sidebarExpanded > * {
      width: calc(33.33% - 24.5px);
    }
  }
`;
