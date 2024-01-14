import React from 'react'
import { Link, Navigate, NavLink } from "react-router-dom";
import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';

import './TeacherDetails.css'

function TeacherDetails(props) {
  console.log(props)
  const { id, username, profileImage  } = props;

  const joinLiveClass = () => {
    console.log("Hello!!!!!!!!");
    // Navigate(`/live/roomId=${id}`);
    Navigate("/");
  }
  return (
    <div className="teacher_details">
        
        <Avatar src={profileImage} sx={{ width: 70, height: 70 }}/>
        {props.username && <h2>{username}</h2>}
        <Link to={`/live/?roomID=${id}&role=Audience`}>
          <Button 
            style={{fontSize: "1rem", color: 'whitesmoke', background: "#b82323"}}>
            Join Live
          </Button>
        </Link>
    </div>
  )
}

export default TeacherDetails