import React from 'react'
import './TeacherCard.css'
import { Avatar } from '@mui/material'
import { Link } from 'react-router-dom'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

function TeacherCard(props) {
  const {profileImage, username, id, socialMediaLinks} = props
    
  return (
    <div classname="teachercard-outer">
      <Link to={`/instructor/${id}`}>
        <div className="teachercard">
          <Avatar src={profileImage} sx={{ width: 100, height: 100 }} />

          <h4 classname="username">{username}</h4>

          <div className="socials">
            <Link to={socialMediaLinks?.linkedin || '#'}>
              <LinkedInIcon />
            </Link>

            <Link to={socialMediaLinks?.twitter || '#'}>
              <TwitterIcon />
            </Link>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default TeacherCard