import React from 'react'
import './Homepage.css'
import TeacherDetails from './TeacherDetails'
import VideoCards from './VideoCards'
import { useNavigate } from 'react-router-dom';


function HomepageTeacher() {
  const navigate = useNavigate();
  const goLive = () => {
    navigate("/live");
  }

  const uploadVideo = () => {
    navigate("/uploadvideo");
  }

  return (
    <div className="homepage">
      <div className="navigation">
        <button className="navbar_option" onClick={goLive}>Go Live</button>
        <button className="navbar_option" onClick={uploadVideo}>Upload Lecture</button>
      </div>
      <div className="content">
        <TeacherDetails />
        <VideoCards />
      </div>
    </div>
  )
}

export default HomepageTeacher