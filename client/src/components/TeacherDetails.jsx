import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import VideoCard from "./VideoCard";
// import './TeacherDetails.css'
import InstructorVideo from "./InstructorVideo";
import InstructorHome from "./InstructorHome";
import InstructorAbout from "./InstructorAbout";
import InstructorPlaylist from "./InstructorPlaylist";
import styled from "styled-components";

function TeacherDetails(props) {
  console.log(props);

  const { _id, username, profileImage, subscriberCount, videoLectures, courses } =
    props.instructordata;
  const isOwner  = props.isOwner;
  const isSubscribed  = props.isSubscribed;
  const setIsSubscribed  = props.setIsSubscribed;
  const setInstructorData = props.setInstructorData;
  const [tabValue, setTabvalue] = useState(0);
  const joinLiveClass = () => {
    console.log("Hello!!!!!!!!");
    // Navigate(`/live/roomId=${id}`);
    Navigate("/");
  };


  const subscribe = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/instructor/subscribe/${_id}`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      const data = await response.json();
      console.log(data);

      if (data.ok) {
        // Toast add
        setIsSubscribed(true);
        setInstructorData(prev => {
          if (prev) {
            const updatedSubscriberCount = data.updatedSubscriberCount;
            // subscriberCount = updatedSubscriberCount;
            return {
              ...prev,
              subscriberCount: updatedSubscriberCount
            };
          }
        
          return prev;
        });
      }
    } catch (error) {}
  };

  const unsubscribe = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/instructor/unsubscribe/${_id}`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })

      const data = await response.json();
      console.log(data);
      if (data.ok) {
        // Toast add
        setIsSubscribed(false);
        setInstructorData(prev => {
          if (prev) {
            const updatedSubscriberCount = data.updatedSubscriberCount;
            // subscriberCount = updatedSubscriberCount;
            
            return {
              ...prev,
              subscriberCount: updatedSubscriberCount
            };
          }
        
          return prev;
        });
      }
    } catch (error) {}
  };
  return (
    <Container>
      <ParentTeacherDetails>
        <div className="teacher_details">
          <div className="avatar-box">
            <Avatar src={profileImage} sx={{ width: 70, height: 70 }} />
          </div>
          <div className="user-info">
            <div className="username">
              <h2>{username}</h2>
            </div>
            <div className="subscriber-count">
              {console.log(subscriberCount)}
              <span>{subscriberCount} subscribers</span>
            </div>
            {!isOwner && <div className="subscriber-btn">
              {!isSubscribed 
                ? <button className="button-60" onClick={subscribe}>Subscribe</button>
                : <button className="button-60 subscribed" onClick={unsubscribe}>Subscribed</button>}
            </div>}
          </div>
          <div className="join-live">
            <Link to={`/live/?roomID=${_id}&role=Audience`}>
              <Button>Join Live</Button>
            </Link>
          </div>
        </div>
        <div className="tab-panel">
          <Tabs centered value={tabValue} className="tabpanel">
            <Tab
              label="Home"
              sx={{ border: "none" }}
              onClick={() => setTabvalue(0)}
              className="one"
            />
            <Tab label="Video" onClick={() => setTabvalue(1)} />
            <Tab label="Playlist" onClick={() => setTabvalue(2)} />
            <Tab label="About" onClick={() => setTabvalue(3)} />
          </Tabs>
        </div>
        {tabValue === 0 && (
          <InstructorHome instructordata={props.instructordata} />
        )}
        {tabValue === 1 && <InstructorVideo />}
        {tabValue === 2 && <InstructorPlaylist />}
        {tabValue === 3 && <InstructorAbout />}
      </ParentTeacherDetails>
    </Container>
  );
}

const Container = styled.div`
  .teacher_details {
    /* width: 100; */
    /* background-color: #2B3467; */
    /* background-color: rgb(244, 244, 244); */
    background-color: rgb(255, 255, 255);
    display: flex;
    /* padding-left: 20px;
  padding-right: 20px;
  padding-top: 8px;
  padding-bottom: 8px; */
    width: 100%;
    padding: 2rem;
    flex-direction: row;
    align-items: flex-start;
    color: black;
    height: fit-content;
    gap: 30px;
  }

  .user-info {
    width: 80%;
  }
  .user-info .username h2 {
    font-family: "Roboto", sans-serif;
    font-weight: 600;
    margin: 0px;
  }
  .user-info .subscriber-count span {
    color: rgb(121, 121, 121);
    font-weight: 500;
    font-size: 0.84rem;
  }
  .user-info .subscriber-btn {
    margin-top: 0.4rem;
  }
  .button-60 {
    align-items: center;
    appearance: none;
    background-color: hsl(0, 96%, 41%);
    /* border: 1px solid #dbdbdb; */
    border: none;
    border-radius: 1.275em;

    box-shadow: none;
    box-sizing: border-box;
    color: #ffffff;
    cursor: pointer;
    display: inline-flex;
    font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Helvetica,
      Arial, sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    height: 2.5em;
    justify-content: center;
    line-height: 1.5;
    padding: calc(0.5em - 1px) 1em;
    position: relative;
    text-align: center;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: top;
    white-space: nowrap;
  }

  .subscribed {
    background-color: #b0afaf !important;
  }

  .join-live {
    background-color: rgb(213, 2, 2);
    color: white;
    border-radius: 10px;

    &:hover {
      background-color: rgb(182, 9, 9);
    }

    button {
      color: white;
    }
  }

  .tab-panel {
    border-bottom: 1.5px solid rgb(202, 202, 202);
    text-align: center;
    /* background-color: rgb(244, 244, 244); */
    background-color: white;
    padding: 0px 4px;
    width: 100%;
    /* border: 1px solid red; */
  }
  .tabpanel {
    width: fit-content;
    /* border: 1px solid green; */
    padding: 0 30px;
  }
  .tabpanel .one {
    border: none;
  }
`;
const ParentTeacherDetails = styled.div`
  .teacher_details {
    /* width: 100; */
    /* background-color: #2B3467; */
    /* background-color: rgb(244, 244, 244); */
    background-color: rgb(255, 255, 255);
    display: flex;
    /* padding-left: 20px;
    padding-right: 20px;
    padding-top: 8px;
    padding-bottom: 8px; */
    padding: 2rem;
    flex-direction: row;
    align-items: flex-start;
    color: black;
    height: fit-content;
    gap: 30px;
  }

  .user-info {
    width: 80%;
  }
  .user-info .username h2 {
    font-family: "Roboto", sans-serif;
    font-weight: 600;
    margin: 0px;
  }
  .user-info .subscriber-count span {
    color: rgb(121, 121, 121);
    font-weight: 500;
    font-size: 0.84rem;
  }
  .user-info .subscriber-btn {
    margin-top: 0.4rem;
  }
  .button-60 {
    align-items: center;
    appearance: none;
    background-color: hsl(0, 96%, 41%);
    /* border: 1px solid #dbdbdb; */
    border: none;
    border-radius: 1.275em;

    box-shadow: none;
    box-sizing: border-box;
    color: #ffffff;
    cursor: pointer;
    display: inline-flex;
    /* font-family: BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif; */
    font-size: 0.9rem;
    font-weight: 500;
    height: 2.5em;
    justify-content: center;
    line-height: 1.5;
    padding: calc(0.5em - 1px) 1em;
    position: relative;
    text-align: center;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: top;
    white-space: nowrap;
  }

  .join-live {
    background-color: rgb(213, 2, 2);
    color: white;
    border-radius: 10px;
    margin-left: auto;
    &:hover {
      background-color: rgb(182, 9, 9);
    }

    button {
      color: white;
      white-space: nowrap;
    }
  }

  .tab-panel {
    border-bottom: 1.5px solid rgb(202, 202, 202);
    text-align: center;
    /* background-color: rgb(244, 244, 244); */
    background-color: white;
    padding: 0px 4px;
    width: 100%;
    /* border: 1px solid red; */
  }
  .tabpanel {
    width: fit-content;
    /* border: 1px solid green; */
    padding: 0 30px;
  }
  .tabpanel .one {
    border: none;
  }
  button:focus {
    border: none;
    outline: none;
  }

  @media only screen and (max-width: 800px) {
    .user-info .username h2 {
      font-family: "Roboto", sans-serif;
      font-weight: 600;
      margin: 0px;
      font-size: 18px;
    }
  }
`;

export default TeacherDetails;
