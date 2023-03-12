import React from 'react'
import { Avatar } from '@mui/material';
import './VideoCard.css'

function VideoCard(props) {
  const {img, video} = props;

  return (
    <div className="videocard">
        <img src={video.thumbnail} alt="" className="thumbnail"/>
        <div className="details">
            <div className="details_logo">
                <Avatar src={img} alt="" />
            </div>
            <p>{video.title}</p>
        </div>
    </div>
  )
}

export default VideoCard