import React from 'react'
import { useParams } from 'react-router-dom'


function TeacherForum() {
    const param = useParams();
    // console.log(userID);
  return (
    <div>{param}</div>
  )
}

export default TeacherForum