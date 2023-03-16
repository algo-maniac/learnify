import React from 'react'
import './TeacherCard.css'
import { Avatar } from '@mui/material'
import { Link } from 'react-router-dom'

function TeacherCard(props) {
  const {img, username, id} = props
    
  return (
    <div className="teachercard">
      <Link to={"/teacher/" + id}>
        <div>
        <Avatar src={img} sx={{ width: 100, height: 100 }} />
        <h3>{username}</h3>
        </div>
      </Link>
    </div>
  )
}

export default TeacherCard