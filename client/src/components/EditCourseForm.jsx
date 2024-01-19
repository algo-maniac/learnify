import { useNavigate, useParams } from 'react-router-dom';
import AddSectionForm from './AddSectionForm'
import AddVideo from './AddVideo'
import EditBasicDetailsForm from './EditBasicDetailsForm'
import React, { useState, useEffect } from 'react';
import './EditCourseForm.css'
import EditSectionDetailsForm from './EditSectionDetailsForm';

const EditCourseForm = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState({
    _id: '',
    title: '',
    description: '',
    duration: 0,
    price: 0,
    level: 'beginner',
    category: '',
    thumbnail: '',
    videoFile: '',
    sections: [],
  });

  // const [sections, setSections] = useState([]);
  const [showAddSectionForm, setShowAddSectionForm] = useState(false);
  const [sectionAddVideoState, setSectionAddVideoState] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);
  const [showEditSectionForm, setShowEditSectionForm] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);


  const handleAddVideoClick = (sectionId) => {
    setSectionAddVideoState((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
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
    setShowAddSectionForm(!showAddSectionForm);
  };

  const handleBasicDetailsSubmit = async (editedDetails, editedThumbnail, editableFields) => {
    try {
      console.log(editedDetails);
      console.log(editedThumbnail);
      const formData = new FormData();
      if (editableFields['title']) formData.append('title', editedDetails.title);
      if (editableFields['description']) formData.append('description', editedDetails.description);
      if (editableFields['duration']) formData.append('duration', editedDetails.duration);
      if (editableFields['price']) formData.append('price', editedDetails.price);
      if (editableFields['level']) formData.append('level', editedDetails.level);
      if (editableFields['category']) formData.append('category', editedDetails.category);
      if (editableFields['thumbnail']) formData.append('thumbnail', editedThumbnail);

      const res = await fetch(`http://localhost:8000/course/editBasicCourseDetails/${courseId}`, {
        method: 'PUT',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
        body: formData
      });

      const data = await res.json();

      console.log(data);
      if (data.ok) {
        console.log(data.course)
        setCourseDetails(prevCourseDetails => {
          return {
            ...prevCourseDetails,
            ...data.course
          }
        });
        console.log(data.course);
        console.log(data.course.thumbnail);
        toggleShowEditForm();
      } else {

      }
    } catch (error) {
      // Handle error
    }
  };

  const toggleShowEditForm = () => {
    setShowEditForm(prev => !prev);
  }

  const handleEditSectionClick = (sectionId) => {
    const sectionToEdit = courseDetails.sections.find((section) => section._id === sectionId);
    setSelectedSection(sectionToEdit);
    setShowEditSectionForm(true);
  };

  const handleSectionDetailsSubmit = async (formData, sectionId) => {
    try {
      const res = await fetch(`http://localhost:8000/course/editSectionDetails/${courseId}/${sectionId}`, {
        method: 'PUT',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
        body: formData
      });

      const data = await res.json();

      console.log(data);
      if (data.ok) {
        const updatedSection = data.updatedSection;
        setCourseDetails((prevDetails) => {
          const updatedCourseDetails = { ...prevDetails };
      
          const sectionIndex = updatedCourseDetails.sections.findIndex(
            (section) => section._id === sectionId
          );
      
          if (sectionIndex !== -1) {
            const previousSection = updatedCourseDetails.sections[sectionIndex];
            updatedCourseDetails.sections[sectionIndex] = {
              ...previousSection,
              ...updatedSection,
            };
          }
      
          return updatedCourseDetails;
        });
        setShowEditSectionForm(false);
      } else {

      }
    } catch (error) {
      // Handle error
    }
    setShowEditSectionForm(false);
  }

  const handleDeleteSectionClick = async (sectionId) => {
    try {
      const res = await fetch(`http://localhost:8000/course/deleteSection/${sectionId}`, {
        method: 'DELETE',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      const data = await res.json();

      if (data.ok) {
        setCourseDetails((prevDetails) => {
          const updatedCourseDetails = { ...prevDetails };
          const updatedSections = updatedCourseDetails.sections.filter(
            (section) => section._id !== sectionId
          );
          updatedCourseDetails.sections = updatedSections;
          return updatedCourseDetails;
        });
      } else {

      }
    } catch (error) {
      // Handle error
    }
    setShowEditSectionForm(false);
  }

  const handleDeleteCourse = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`http://localhost:8000/course/deleteCourse/${courseDetails._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      const data = await res.json();

      if (data.ok) {
        navigate('/courses');
      } else {
        // 
      }
    } catch (error) {
      // Handle error
    }
    setShowEditSectionForm(false);
  }

  useEffect(() => {
    console.log("Edit course form re rendered");
  })

  return (
    <div className="edit-course-container">
      <div className="basic-details">
        {showEditForm ? (
          <EditBasicDetailsForm
            initialDetails={courseDetails}
            onSubmit={handleBasicDetailsSubmit}
            toggleShowEditForm={toggleShowEditForm}
          />
        ) : (
          <div className="test-details">
            <h2>{courseDetails.title}</h2>
            <p>Description: {courseDetails.description}</p>
            <p>Duration: {courseDetails.duration} months</p>
            <p>Price: {courseDetails.price} INR</p>
            <p>Level: {courseDetails.level}</p>
            <p>Category: {courseDetails.category}</p>
            <button onClick={toggleShowEditForm}>Edit Basic Details</button>
            <button onClick={handleDeleteCourse} className='delete'>Delete Course</button>
          </div>
        )}

        {courseDetails && courseDetails.thumbnail && (
          <div className="thumbnail-container">
            <img
              src={courseDetails.thumbnail}
              alt="Course Thumbnail"
            />
          </div>
        )}
      </div>

      <h3>Sections</h3>

      {courseDetails.sections && courseDetails.sections.map((section) => (
        <React.Fragment key={section._id}>
          {showEditSectionForm && selectedSection && selectedSection._id === section._id ? (
            <EditSectionDetailsForm
              initialSectionDetails={{ ...section }}
              onSubmit={handleSectionDetailsSubmit}
              setCourseDetails={setCourseDetails}
              // handleVideoDetailsSubmit={handleVideoDetailsSubmit}
              toggleShowEditSectionForm={() => setShowEditSectionForm(false)}
            />
          ) : (
            <ul className="sections-list">
              <li className="section-item">
                <div className="section-title">{section.title}</div>
                <div className="section-description">{section.description}</div>
                {section.videoLectures && section.videoLectures.length > 0 && (
                  <div className="videos-container">
                    {section.videoLectures.map((video) => (
                      <div key={video._id} className="video-item">
                        <div className='video-item-details'>
                          <div className="video">
                            <video
                              id="my-player"
                              className="video-js"
                              controls
                              controlsList="nodownload"
                              poster={video.thumbnail}
                              preload="auto"
                              data-setup='{}'>
                              {video.videoFile && <source src={video.videoFile}></source>}
                            </video>
                          </div>
                          <div className="details">
                            <div>{video.title}</div>
                            <div>{video.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {sectionAddVideoState[section._id] && (
                  <AddVideo courseId={courseId} sectionId={section._id} setCourseDetails={setCourseDetails} />
                )}
                <button onClick={() => handleAddVideoClick(section._id)}>
                    {sectionAddVideoState[section._id] ? 'Cancel Add Video' : 'Add Video'}
                </button>
                <div className="buttons">
                  
                  <button onClick={() => handleEditSectionClick(section._id)}>
                    Edit Section
                  </button>
                  <button onClick={() => handleDeleteSectionClick(section._id)} className='delete'>
                    Delete Section
                  </button>
                </div>
              </li>
            </ul>
          )}
        </React.Fragment>
      ))}

      
      <button onClick={handleAddSectionClick}>
        {showAddSectionForm ? 'Cancel Add Section' : 'Add Section'}
      </button>
      {showAddSectionForm && <AddSectionForm setCourseDetails={setCourseDetails} handleAddSectionClick={handleAddSectionClick} />}
    </div>
  )
}

export default EditCourseForm