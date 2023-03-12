import React from 'react'
import './TeacherCard.css'
import { Avatar } from '@mui/material'

function TeacherCard(props) {
  const {img, username} = props
    
  return (
    <div className="teachercard">
        <Avatar src={img} sx={{ width: 100, height: 100 }} />
        <h3>{username}</h3>
    </div>
  )
}

export default TeacherCard