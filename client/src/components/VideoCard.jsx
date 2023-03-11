import React from 'react'
import lectureThumbnail from "../lecture_thumbnail.jpeg"
import react from '../logo.svg'  
import './VideoCard.css'

function VideoCard() {
  return (
    <div className="videocard">
        <img src={lectureThumbnail} alt="" className="thumbnail"/>
        <div className="details">
            <div className="details_logo">
                <img src={react} alt="" />
            </div>
            <p>Lecture titleLecture titleLecture titleLecture title</p>
        </div>
    </div>
  )
}

export default VideoCard