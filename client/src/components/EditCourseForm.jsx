import { useParams } from 'react-router-dom';
import AddSectionForm from './AddSectionForm'
import AddVideo from './AddVideo'
import React, { useState, useEffect } from 'react';
import './EditCourseForm.css'

const EditCourseForm = () => {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState({
    title: '',
    description: '',
    duration: 0,
    price: 0,
    level: 'beginner',
    category: '',
    thumbnail: '',
    sections: [],
  });

  const [sections, setSections] = useState([]);
  const [showAddSectionForm, setShowAddSectionForm] = useState(false);
  const [showAddVideo, setShowAddVideo] = useState(false);

  const handleAddVideoClick = () => {
    setShowAddVideo(true);
  };

  const fetchCourseDetails = async () => {
    const res = await fetch(`http://localhost:8000/course/getCourse/${courseId}`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token'),
      }
    });

    const data = await res.json();
    console.log(data);
    if (data.ok) {
      setCourseDetails(data.course);
      console.log(data.course);
      console.log(data.course.thumbnail);
    } else {

    }
  }
  useEffect(() => {
    fetchCourseDetails();

  }, []);

  const handleAddSectionClick = () => {
    // Toggle the state to show/hide AddSectionForm
    setShowAddSectionForm(!showAddSectionForm);
  };

  return (
    <div className="edit-course-container">
      <h2>{courseDetails.title}</h2>
      <p>Description: {courseDetails.description}</p>
      <p>Duration: {courseDetails.duration} months</p>
      <p>Price: {courseDetails.price} INR</p>
      <p>Level: {courseDetails.level}</p>
      <p>Category: {courseDetails.category}</p>

      {courseDetails && courseDetails.thumbnail && (
        <div className="thumbnail-container">
          <img
            src={courseDetails.thumbnail}
            alt="Course Thumbnail"
          />
        </div>
      )}

      <h2>Sections</h2>
      <ul className="sections-list">
        {courseDetails.sections &&
          courseDetails.sections.map((section) => (
            <li key={section._id} className="section-item">
              <div className="section-title">{section.title}</div>
              <div className="section-description">{section.description}</div>
              {section.videoLectures && section.videoLectures.length > 0 && (
                <div className="videos-container">
                  {section.videoLectures.map((video) => (
                    <div key={video._id} className="video-item">
                      <img src={video.thumbnail} alt="Video Thumbnail" />
                      <div className='video-item-details'>
                        <div>{video.title}</div>
                        <div>{video.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button onClick={handleAddVideoClick}>Add Video</button>
              {showAddVideo && <AddVideo courseId={courseId} sectionId={section._id} setCourseDetails={setCourseDetails} />}
            </li>
          ))}
      </ul>
      <button onClick={handleAddSectionClick}>Add Section</button>
      {showAddSectionForm && <AddSectionForm />}
    </div>
  )
}

export default EditCourseForm