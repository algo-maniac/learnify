import React from "react";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

function VideoCard(props) {
  const { id, title, description, duration, thumbnail, profileImage } = props;
  return (
    <Container>
      <div className="videocard">
        <Link to={`/video/${id}`}>
          <div className="thumbnailContainer">
            <img src={thumbnail} alt="" className="thumbnail" />
            <p className="duration">{duration}</p>
          </div>
          <div className="details">
            <div className="details_logo">
              <Avatar src={profileImage} alt="profileImage" />
            </div>
            <div className="title">
              <p>{title}</p>
              {/* <p>{duration}</p> */}
              {/* <p>{description}</p> */}
            </div>
          </div>
        </Link>
      </div>
    </Container>
  );
}

export default VideoCard;

const Container = styled.div`
  .videocard {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 1px 1px 5px rgb(148, 146, 146);
  }

  .videocard > a {
    text-decoration: none;
    color: black;
  }

  .thumbnailContainer {
    position: relative;
    width: 100%;
  }

  .thumbnailContainer img {
    position: relative;
    width: 100%;
    aspect-ratio: 2/1;
    object-fit: cover;
  }

  .details {
    display: flex;
    /* align-items: flex-start; */
    padding: 5px;
    align-items: center;
  }

  .details_logo {
    width: 70px;
  }

  .title {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  p {
    padding: 3px;
    margin: 0;
    font-size: 0.8em;
  }

  .duration {
    position: absolute;
    bottom: 5px;
    right: 5px;
    background-color: rgba(0, 0, 0, 0.662);
    color: white;
    border-radius: 5px;
  }
`;
