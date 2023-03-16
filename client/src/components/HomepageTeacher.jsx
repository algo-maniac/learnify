import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './HomepageTeacher.css'
import TeacherDetails from './TeacherDetails'
import VideoCards from './VideoCards'
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'


function HomepageTeacher(props) {
  const userData = props.userData;
  console.log("in this", userData);
  
  const {userID} = useParams();
  // console.log(userID);
  const [teacherInfo,setData]=useState([]);
    useEffect(()=>{
      const url = "http://localhost:8000/teacher/"+userID;
      fetch(url,{
        method:'GET'
      }).then((data)=>{
        return data.json();
      }).then((result)=>{
        console.log(result.data);
        setData([...result.data]);
        console.log("teacher info",teacherInfo, teacherInfo[0]);
        console.log(teacherInfo);
        // This is the information of all teachers
        // console.log(result); first console it then examine it 
      })
      .catch((er)=>{
        console.log('error in fetching');
      })

    },[]);

  // const teacherInfoo = {
  //   userName: "Alakh Pandey",
  //   img: "https://images.hindustantimes.com/img/2021/10/21/1600x900/IMG_1400_1634826351847_1634826367466.jpg",
  //   isTeacher: true,
  //   videos: [
  //     {
  //       thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2lb5xTlKkJnuDaWpONxk68vb7vmtmqsxDqg&usqp=CAU",
  //       title: "Lecture titleLecture titleLecture titleLecture title",
  //     },
  //     {
  //       thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2lb5xTlKkJnuDaWpONxk68vb7vmtmqsxDqg&usqp=CAU",
  //       title: "Lecture titleLecture titleLecture titleLecture title",
  //     },
  //     {
  //       thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2lb5xTlKkJnuDaWpONxk68vb7vmtmqsxDqg&usqp=CAU",
  //       title: "Lecture titleLecture titleLecture titleLecture title",
  //     },
  //     {
  //       thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2lb5xTlKkJnuDaWpONxk68vb7vmtmqsxDqg&usqp=CAU",
  //       title: "Lecture titleLecture titleLecture titleLecture title",
  //     },
  //     {
  //       thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2lb5xTlKkJnuDaWpONxk68vb7vmtmqsxDqg&usqp=CAU",
  //       title: "Lecture titleLecture titleLecture titleLecture title",
  //     }
  //   ]
  // }

  

  return (
    <div className='homepage'>
      <div className='sidebar'>
      {userData.isTeacher && userData.isLogged &&
        <div>
          < Sidebar id={userData.id}/>
        </div>
      }
      </div>
      <div className="content">
        {teacherInfo && teacherInfo[0] && <TeacherDetails username={teacherInfo[0].username} img={teacherInfo[0].img}/>}
        {teacherInfo && teacherInfo[0] && <VideoCards teacherInfo={teacherInfo[0]}/>}
      </div>
      
    </div>
  )
}

export default HomepageTeacher