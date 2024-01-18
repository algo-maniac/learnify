import React, { useState } from 'react'
import { Link, Navigate } from "react-router-dom";
import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import VideoCard from './VideoCard'
import './TeacherDetails.css'
import InstructorVideo from './InstructorVideo';
import InstructorHome from './InstructorHome';
import InstructorAbout from './InstructorAbout';
import InstructorPlaylist from './InstructorPlaylist';

function TeacherDetails(props) {
  console.log(props)
  const { id, username, profileImage  } = props;
  const [tabValue,setTabvalue]=useState(0);
  const joinLiveClass = () => {
    console.log("Hello!!!!!!!!");
    // Navigate(`/live/roomId=${id}`);
    Navigate("/");
  }
  return (
    <>
    <div className="teacher_details">
      <div className="avatar-box">
        <Avatar src={profileImage} sx={{ width: 70, height: 70 }}/>
      </div>
      <div className="user-info">
        <div className="username">
          <h2>{props.username}</h2>
        </div>
        <div className="subscriber-count">
          <span>12 subscribers</span>
        </div>
        <div className="subscriber-btn">
          <button className="button-60">Subscribe</button>
        </div>
      </div>
      <div className="join-live">
        <Link to={`/live/?roomID=${id}&role=Audience`}>
          <Button 
            style={{fontSize: "1rem", color: 'whitesmoke', background: "#b82323"}}>
            Join Live
          </Button>
        </Link>
      </div>
    </div>
    <div className="tab-panel">
      <Tabs centered value={tabValue} className='tabpanel' >
        <Tab label="Home" sx={{border:'none'}} onClick={()=>setTabvalue(0)} className='one'/>
        <Tab label="Video" onClick={()=>setTabvalue(1)}/>
        <Tab label="Playlist" onClick={()=>setTabvalue(2)}/>
        <Tab label="About" onClick={()=>setTabvalue(3)}/>
      </Tabs>
    </div>
    {tabValue===0 && <InstructorHome/>}
    {tabValue===1 && <InstructorVideo/>}
    {tabValue===2 && <InstructorPlaylist/>}
    {tabValue===3 && <InstructorAbout/>}

    </>
  )
}

export default TeacherDetails