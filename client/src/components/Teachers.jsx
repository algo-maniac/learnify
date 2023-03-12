import React from 'react'
import './Teachers.css'

import TeacherCard from './TeacherCard'
import Sidebar from './Sidebar'

function Teachers(props) {

    const {isLoggedIn, isTeacher} = props;

    const img = "https://media.licdn.com/dms/image/D4D03AQE1L_29dsHJ3g/profile-displayphoto-shrink_400_400/0/1670253835119?e=1684368000&v=beta&t=SrUPxECxQl-nxgmofKmOrQDdXE_5Ollb9Bqa4_7ImXQ"
    const username= "Chandrachur Mukerjee"
  return (
    <div className='teachers'>
        {isLoggedIn && isTeacher &&<div>
            <Sidebar /> 
        </div>}
        <div className="teachercards">
            <TeacherCard img={img} username={username} />
            <TeacherCard img={img} username={username} />
            <TeacherCard img={img} username={username} />
        </div>
    </div>
  )
}

export default Teachers