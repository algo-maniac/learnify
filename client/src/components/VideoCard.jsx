import React from 'react'
import { Avatar } from '@mui/material';
import './VideoCard.css'
import { Link } from 'react-router-dom';

function VideoCard(props) {
  const { id, title, description, duration, thumbnail, profileImage } = props;
  return (
    <div className="videocard">
      <Link to={`/video/${id}`}>
            <div className="thumbnailContainer">
              <img src={thumbnail} alt="" className="thumbnail"/>
              <p className="duration">{duration}</p>
            </div>
            <div className="details">
                <div className="details_logo">
                    <Avatar src={profileImage} alt="profileImage" />
                </div>
                <div className="title">
                  <p>{title}</p>
                  {/* <p>{duration}</p> */}
                  {/* <p>{description}</p> */}
                </div>
            </div>
      </Link>
    </div>
  )
}

export default VideoCard
