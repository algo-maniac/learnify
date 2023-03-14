import React from 'react'
import VideoCard from './VideoCard'
import './VideoCards.css'

function VideoCards(props) {
  const { username, img, isTeacher, videoInfo } = props.teacherInfo;
  console.log(videoInfo);

  return (
    <div className="videocards">
      
      {videoInfo && videoInfo.map(video => (
        <VideoCard img={img} video={video} />
      ))}
    </div>
  )
}

export default VideoCards