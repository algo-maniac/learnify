import React from 'react'
import VideoCard from './VideoCard'
import './VideoCards.css'

function VideoCards(props) {
  const { username, img, isTeacher, videos } = props.teacherInfo;
  console.log(videos);

  return (
    <div className="videocards">
      
      {videos.map(video => (
        <VideoCard img={img} video={video} />
      ))}
    </div>
  )
}

export default VideoCards