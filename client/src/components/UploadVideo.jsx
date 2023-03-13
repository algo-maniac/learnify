import React, { useEffect } from 'react'
import './UploadVideo.css'
import { useState } from 'react'
// import '/assets/logo192.png'
import { Navigate, useNavigate } from 'react-router-dom';
function UploadVideo(props) {
  const navigate=useNavigate();
  // console.log(props.userData);
  // props mein data tik nhi raha hai toh jwt ke baad shayad karega 
  // email se search karunga mein 
  const email="abc@gmail.com";
  // fake user defined email is used after jwt actual data will be used
  const [teacherInfo,setInfo]=useState([]);
  const [formData, setFormData] = useState({
    title: "",
    videoUrl: "",
    userID: ""
  })
  const [file,setFile]=useState('');
  const imgHandler=(env)=>{
    setFile(env.target.files[0]);
  }
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const form=new FormData();
    form.append('image',file);
    form.append('title',formData.title);
    form.append('videourl',formData.videoUrl);
    form.append('email',email);
      fetch('http://localhost:8000/teacher',{
        method:'POST',
        body:form
      }).then((data)=>{
        return data.json();
      }).then((result)=>{
        alert(result.msg);
        // navigate karna hai waha kar dena
        navigate(`teacher/${props.username.substring(0,5)}`);
      })
      .catch((er)=>{
      })
  }
    // console.log(props);
  return (
    <div className='uploadvideo'>
      <form className="uploadvideo_form">
        <label 
          htmlFor="title"
          name="title"
        >
          Title: 
          <input 
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label 
          htmlFor="videoUrl"
          name="videoUrl"
        >
          VideoUrl: 
          <input 
            type="url"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
          />
        </label>
        <label 
          htmlFor="thumbnail"
          name="thumbnail"
        >
          Thumbnail: 
          <input 
            type="file"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={imgHandler}
          />
        </label>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default UploadVideo