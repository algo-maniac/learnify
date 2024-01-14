import React, { useEffect, useState, useContext } from 'react'
import './Instructors.css'

import TeacherCard from './TeacherCard'
import Sidebar from './Sidebar'
import Loader from './Loader'
import AuthContext from '../store/auth-context' 
function Instructors(props) {
  const [instructors, setInstructors] = useState([]);

  const { userdata } = useContext(AuthContext);
  console.log(userdata);

  const fetchInstructors = async () => {
    const data = await fetch('http://localhost:8000/instructor', {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })

    const json = await data.json();
    setInstructors(json.instructors);
  }

  useEffect(() => {
    if(localStorage.getItem("token"))
      fetchInstructors();
  }, []);

  return (
    <div className='teachers'>
      <div className='sidebar'>
        {userdata.role === "instructor" && <div>
          <Sidebar email={""} />
        </div>}
      </div>
      <div className="teachercards">
        {instructors && instructors.map(instructor => (
          <TeacherCard 
            id={instructor._id} 
            username={instructor.username} 
            profileImage={instructor.profileImage} 
            socialMediaLinks={instructor.socialMediaLinks} 
          />
        ))}
      </div>
    </div>
  )
}

export default Instructors