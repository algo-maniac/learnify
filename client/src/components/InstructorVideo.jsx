import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './HomepageTeacher.css'
import TeacherDetails from './TeacherDetails'
import VideoCard from './VideoCard'
import Sidebar from './Sidebar'
import AuthContext from '../store/auth-context'

const InstructorVideo=()=>{
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
  const toMin=(val)=>{
    var duration="";
    var min=parseInt(val);
    if(min){
      duration+=min+" m"
    }
    else{
      duration+="1 m"
    }
    return duration
  }
    return <>
        <div className="videos">
          {instructordata && instructordata.videoLectures &&
            instructordata.videoLectures.map(vid => {
              return <div className="video">
                <VideoCard
                  id={vid._id}
                  title={vid.title}
                  description={vid.description}
                  duration={toMin(vid.duration)}
                  thumbnail={vid.thumbnail}
                  profileImage={instructordata.profileImage}
                />
              </div>
            })
          }
        </div>
    </>
}
export default InstructorVideo