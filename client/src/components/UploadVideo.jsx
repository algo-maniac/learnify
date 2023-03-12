import React from 'react'
import './UploadVideo.css'
// import '/assets/logo192.png'

function UploadVideo(props) {
  const [formData, setFormData] = React.useState({
    title: "",
    thumbnail: "",
    videoUrl: "",
    userID: ""
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value })
    // console.log(formData);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  }
  
    // console.log(props);
  return (
    <div className='uploadvideo'>
      <form onSubmit={handleSubmit} className="uploadvideo_form">
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
          htmlFor="thumbnail"
          name="thumbnail"
        >
          Thumbnail: 
          <input 
            type="url"
            name="thumbnail"
            value={formData.thumbnail}
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
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default UploadVideo