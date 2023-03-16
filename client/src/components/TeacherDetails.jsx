import React from 'react'
import { Avatar } from '@mui/material';

import './TeacherDetails.css'

function TeacherDetails(props) {
  const { username, img } = props;
  return (
    <div className="teacher_details">
        
        <Avatar src={img} sx={{ width: 70, height: 70 }}/>
        {props.username && <h2>{username}</h2>}
    </div>
  )
}

export default TeacherDetails