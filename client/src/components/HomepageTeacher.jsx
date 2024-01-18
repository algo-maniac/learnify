import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './HomepageTeacher.css'
import TeacherDetails from './TeacherDetails'
import VideoCard from './VideoCard'
import Sidebar from './Sidebar'
import AuthContext from '../store/auth-context'


function HomepageTeacher() {
  const { userdata } = useContext(AuthContext);
  const { id } = useParams();

  const [instructordata, setInstructorData] = useState();

  const getInstructorData = async () => {
    const data = await fetch(`http://localhost:8000/instructor/getInstructor/${id}`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });
    const json = await data.json();
    console.log(json.instructor);
    setInstructorData(json.instructor);
  }
  useEffect(() => {
    try {
      getInstructorData();
    } catch (err) {
      console.log(err);
    }
  }, []);


  return (
    <div className='homepage'>
      <div className='sidebar'>
        {userdata && userdata.role === "instructor" &&
          <div>
            < Sidebar id={userdata.id} />
          </div>
        }
      </div>
      <div className="contentt">
        <div className="instructorDetails">
        {instructordata &&
          <TeacherDetails
            className='instructorDetails'
            id={instructordata._id}
            username={instructordata.username}
            profileImage={instructordata.profileImage}
          />}
        </div>
        <div className="videos">
          {instructordata && instructordata.videoLectures &&
            instructordata.videoLectures.map(vid => {
              return <div className="video">
                <VideoCard
                  id={vid._id}
                  title={vid.title}
                  description={vid.description}
                  duration={vid.duration}
                  thumbnail={vid.thumbnail}
                  profileImage={instructordata.profileImage}
                />
              </div>
            })
          }
        </div>
      </div>

    </div>
  )
}

export default HomepageTeacher