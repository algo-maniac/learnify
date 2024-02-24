import React from "react";

import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import styled from "styled-components";

function TeacherCard(props) {
  const { profileImage, username, id, socialMediaLinks } = props;

  return (
    <Container>
      <div classname="teachercard-outer">
        <Link to={`/instructor/${id}`}>
          <div className="teachercard">
            <Avatar src={profileImage} sx={{ width: 100, height: 100 }} />

            <h4 classname="username">{username}</h4>

            <div className="socials">
              <Link to={socialMediaLinks?.linkedin || "#"}>
                <LinkedInIcon />
              </Link>

              <Link to={socialMediaLinks?.twitter || "#"}>
                <TwitterIcon />
              </Link>
            </div>
          </div>
        </Link>
      </div>
    </Container>
  );
}

export default TeacherCard;

const Container = styled.div`
  height: 100%;
  width: 100%;

  .teachercard-outer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .teachercard {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    /* background-color: whitesmoke; */
    background-color: rgb(255, 255, 255);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 2px 2px 10px rgb(210, 210, 210);
    text-decoration: none;
    color: black;
    gap: 10px;
    overflow: hidden;
  }

  .username {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .socials {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
  }

  .socials > * {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 30px;
    background-color: rgb(177, 202, 247);
    border-radius: 10px;
  }

  a:hover,
  a:focus {
    text-decoration: none;
    color: black;
  }
`;
