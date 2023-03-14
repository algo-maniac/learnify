import React from 'react'
import { Avatar } from '@mui/material';
import './VideoCard.css'
import { Link } from 'react-router-dom';

function VideoCard(props) {
  const {img, video} = props;
  return (
    <Link to="/">
      <div className="videocard">
          <img src={"http://localhost:8000/"+props.video.thumbnail} alt="" className="thumbnail"/>
          <div className="details">
              <div className="details_logo">
                  <Avatar src={img} alt="" />
              </div>
              <p>{video.title}</p>
          </div>
      </div>
    </Link>
  )
}

export default VideoCard
