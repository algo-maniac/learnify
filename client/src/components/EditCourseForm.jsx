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
  const [loading, setLoading] = useState(false);
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
    const res = await fetch(`http://localhost:8000/course/getCourseDetailsForEdit/${ courseId }`, {
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
    setShowAddSectionForm(prev => !prev);
  };

  const handleBasicDetailsSubmit = async (editedDetails, editedThumbnail, editableFields) => {
    try {
      setLoading(true);
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

      const res = await fetch(`http://localhost:8000/course/editBasicCourseDetails/${ courseId }`, {
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
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
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
      const res = await fetch(`http://localhost:8000/course/editSectionDetails/${ courseId }/${ sectionId }`, {
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

  const handleVideoDetailsSubmit = async (formData, videoId, sectionId) => {
    try {
      console.log("inside handle video details submit");
      const res = await fetch(`http://localhost:8000/course/editVideoDetails/${videoId}`, {
        method: 'PUT',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
        body: formData
      });

      const data = await res.json();
      console.log(data);

      if (data.ok) {
        const updatedVideoDetails = data.video;
        console.log('updatedVideoDetails', updatedVideoDetails);
        console.log("videoId", videoId, "sectionid", sectionId);
        setCourseDetails((prevDetails) => {
          const updatedCourseDetails = { ...prevDetails };
          const sectionIndex = updatedCourseDetails.sections.findIndex(
            (section) => section._id === sectionId
          );

          if (sectionIndex !== -1) {
            const section = { ...updatedCourseDetails.sections[sectionIndex] };
            const videoIndex = section.videoLectures.findIndex(
              (video) => video._id === videoId
            );

            if (videoIndex !== -1) {
              const updatedVideoLectures = [...section.videoLectures];
              updatedVideoLectures[videoIndex] = {
                ...updatedVideoLectures[videoIndex],
                ...updatedVideoDetails,
              };

              // Update the section with the new videoLectures array
              section.videoLectures = updatedVideoLectures;

              // Update the courseDetails with the updated section
              updatedCourseDetails.sections[sectionIndex] = section;
            }
          }

          console.log(updatedCourseDetails);
          return updatedCourseDetails;
        });

      } else {

      }
    } catch (error) {
      console.log("error in uploading");
      console.log(error);

    }
  }

  const handleDeleteSectionClick = async (sectionId) => {
    try {
      const res = await fetch(`http://localhost:8000/course/deleteSection/${ sectionId }`, {
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
      const res = await fetch(`http://localhost:8000/course/deleteCourse/${ courseDetails._id }`, {
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
            loading={loading}
            setLoading={setLoading}
          />
        ) : (
          <div className="test-details">
            <div className="all-details">
            <div className="details">
              <h2>Title: {courseDetails.title}</h2>
              <p><span className='detais-heading'>Description:</span> {courseDetails.description}</p>
              <p><span className='detais-heading'>Duration:</span> {courseDetails.duration} months</p>
              <p><span className='detais-heading'>Price:</span> {courseDetails.price} INR</p>
              <p><span className='detais-heading'>Level:</span> {courseDetails.level}</p>
              <p><span className='detais-heading'>Category:</span> {courseDetails.category}</p>
            </div>
            {courseDetails && courseDetails.thumbnail && (
              <div className="thumbnail-container">
                <img
                  src={courseDetails.thumbnail}
                  alt="Course Thumbnail"
                />
              </div>
            )}
            </div>
            <div className="buttons">
              <button onClick={toggleShowEditForm} disabled={loading}>Edit Basic Details</button>
              <button onClick={handleDeleteCourse} disabled={loading} className='delete'>Delete Course</button>
            </div>
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
              handleVideoDetailsSubmit={handleVideoDetailsSubmit}
              toggleShowEditSectionForm={() => setShowEditSectionForm(false)}
              loading={loading}
              setLoading={setLoading}
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
                  <AddVideo
                    courseId={courseId}
                    sectionId={section._id}
                    setCourseDetails={setCourseDetails}
                    handleAddVideoClick={handleAddVideoClick}
                    loading={loading}
                    setLoading={setLoading}
                  />
                )}
                <button
                  onClick={() => handleAddVideoClick(section._id)}
                  className={sectionAddVideoState[section._id] ? 'cancel' : ''}
                >
                  {sectionAddVideoState[section._id] ? 'Cancel Add Video' : 'Add Video'}
                </button>
                <div className="buttons">

                  <button onClick={() => handleEditSectionClick(section._id)}>
                    Edit Section
                  </button>
                  <button onClick={() => handleDeleteSectionClick(section._id)} className='delete' disabled={loading}>
                    Delete Section
                  </button>
                </div>
              </li>
            </ul>
          )}
        </React.Fragment>
      ))}


      {showAddSectionForm &&
        <AddSectionForm
          setCourseDetails={setCourseDetails}
          handleAddSectionClick={handleAddSectionClick}
          loading={loading}
          setLoading={setLoading}
        />}
      <div className="buttons">
        <button onClick={handleAddSectionClick} disabled={loading} className={showAddSectionForm ? 'cancel' : ''}>
          {showAddSectionForm ? 'Cancel Add Section' : 'Add Section'}
        </button>
      </div>
      {/* {loading && <div className="loader">Loading...</div>} */}
      {loading && <div className="toaster">Backend call in progress...</div>}
    </div>
  )
}

export default EditCourseForm