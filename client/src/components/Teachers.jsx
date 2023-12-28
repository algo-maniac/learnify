import React, { useEffect, useState } from 'react'
import './Teachers.css'

import TeacherCard from './TeacherCard'
import Sidebar from './Sidebar'
import Loader from './Loader'
function Teachers(props) {
  const { username, email, role, profileImage } = props;


  const [teacherData, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/teachers', {
      method: 'GET'
    }).then((data) => {
      return data.json();
    }).then((result) => {
      setData(result.data);
      console.log(result.data);
      // This is the information of all teachers
      // console.log(result); first console it then examine it 
    })
      .catch((er) => {
        console.log('error in fetching');
      })

  }, []);
  // const img = "https://media.licdn.com/dms/image/D4D03AQE1L_29dsHJ3g/profile-displayphoto-shrink_400_400/0/1670253835119?e=1684368000&v=beta&t=SrUPxECxQl-nxgmofKmOrQDdXE_5Ollb9Bqa4_7ImXQ"
  // const username= "Chandrachur Mukerjee"
  return (
    <div className='teachers'>
      <div className='sidebar'>
        {role === "teacher" && <div>
          <Sidebar email={email} />
        </div>}
      </div>
      <div className="teachercards">
        {teacherData.map(data => (
          <TeacherCard img={data.img} username={data.username} id={data._id} />
        ))}
        {/* <TeacherCard img={img} username={username} />
            <TeacherCard img={img} username={username} />
            <TeacherCard img={img} username={username} /> */}
      </div>
    </div>
  )
}

export default Teachers