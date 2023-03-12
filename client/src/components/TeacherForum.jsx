import React from 'react'
import { useParams } from 'react-router-dom'


function TeacherForum() {
    const param = useParams();
  return (
    <div>{param}</div>
  )
}

export default TeacherForum