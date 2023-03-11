import React from 'react'
import './Homepage.css'
import TeacherDetails from './TeacherDetails'
import VideoCards from './VideoCards'

function HomepageTeacher() {
  return (
    <div className="homepage">
      <div className="navigation">
        {/* <div className="navbar_branding">
          <img src={react} alt="" className='navbar_logo' />
          <h1>Learnify</h1>
        </div> */}
        <button className="navbar_option">Start a Live class</button>
        <button className="navbar_option">Upload Lecture</button>
        <button className="navbar_option">Start a Live class</button>
        <button className="navbar_option">Upload Lecture</button>
      </div>
      <div className="content">
        <TeacherDetails />
        <VideoCards />
      </div>
    </div>
  )
}

export default HomepageTeacher