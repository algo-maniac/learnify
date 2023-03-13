import React from 'react'
import { useParams } from 'react-router-dom'
import './Homepage.css'
import TeacherDetails from './TeacherDetails'
import VideoCards from './VideoCards'
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'


function HomepageTeacher(props) {
  const userData = props.userData;
  console.log("in this", userData);
  
  // const {userID} = useParams();
  // console.log(userID);

  const teacherInfo = {
    userName: "Alakh Pandey",
    img: "https://images.hindustantimes.com/img/2021/10/21/1600x900/IMG_1400_1634826351847_1634826367466.jpg",
    isTeacher: true,
    videos: [
      {
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2lb5xTlKkJnuDaWpONxk68vb7vmtmqsxDqg&usqp=CAU",
        title: "Lecture titleLecture titleLecture titleLecture title",
      },
      {
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2lb5xTlKkJnuDaWpONxk68vb7vmtmqsxDqg&usqp=CAU",
        title: "Lecture titleLecture titleLecture titleLecture title",
      },
      {
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2lb5xTlKkJnuDaWpONxk68vb7vmtmqsxDqg&usqp=CAU",
        title: "Lecture titleLecture titleLecture titleLecture title",
      },
      {
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2lb5xTlKkJnuDaWpONxk68vb7vmtmqsxDqg&usqp=CAU",
        title: "Lecture titleLecture titleLecture titleLecture title",
      },
      {
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2lb5xTlKkJnuDaWpONxk68vb7vmtmqsxDqg&usqp=CAU",
        title: "Lecture titleLecture titleLecture titleLecture title",
      }
    ]
  }

  

  return (
    <div className='homepage'>
      <div>
      {teacherInfo.isTeacher &&
        <div>
          < Sidebar id={userData.id}/>
        </div>
      }
      </div>
      <div className="content">
        <TeacherDetails userName={teacherInfo.userName} img={teacherInfo.img}/>
        <VideoCards teacherInfo={teacherInfo}/>
      </div>
      
    </div>
  )
}

export default HomepageTeacher