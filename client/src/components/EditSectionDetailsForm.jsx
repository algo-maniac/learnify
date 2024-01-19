// EditSectionDetailsForm.js

import React, { useState } from 'react';
import './EditSectionDetailsForm.css';
import EditVideoDetailsForm from './EditVideoDetailsForm';
import { useEffect } from 'react';

const EditSectionDetailsForm = ({ initialSectionDetails, onSubmit, setCourseDetails, toggleShowEditSectionForm }) => {
  console.log(initialSectionDetails);
  const [editedSectionDetails, setEditedSectionDetails] = useState({ ...initialSectionDetails });
  const [editableFields, setEditableFields] = useState({
    title: false,
    description: false,
  });

  const [selectedVideoForEdit, setSelectedVideoForEdit] = useState(null);

  const handleEditClick = (video) => {
    setSelectedVideoForEdit(video);
  };



  const handleCancelEdit = () => {
    setSelectedVideoForEdit(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSectionDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    console.log("inside handel submit inside section");
    e.preventDefault();
    const formData = new FormData();
    if (editableFields['title']) formData.append('title', editedSectionDetails.title);
    if (editableFields['description']) formData.append('description', editedSectionDetails.description);
    onSubmit(formData, initialSectionDetails._id);
  };

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

        setEditedSectionDetails((prevDetails) => ({
          ...prevDetails,
          videoLectures: prevDetails.videoLectures.map((video) =>
            video._id === videoId ? { ...video, ...updatedVideoDetails } : video
          ),
        }));

      } else {

      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteClick = async (video) => {
    try {
      const videoId = video._id;
      const sectionId = video.sectionId;
      console.log("inside handle video details submit");
      const res = await fetch(`http://localhost:8000/course/deleteVideo/${videoId}`, {
        method: 'DELETE',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      const data = await res.json();

      if (data.ok) {

        setCourseDetails((prevDetails) => {
          const updatedDetails = { ...prevDetails };
          const sectionIndex = updatedDetails.sections.findIndex(
            (section) => section._id === sectionId
          );

          if (sectionIndex !== -1) {
            const section = { ...updatedDetails.sections[sectionIndex] };
            const updatedVideoLectures = section.videoLectures.filter(
              (video) => video._id !== videoId
            );

            // Update the section with the new videoLectures array
            section.videoLectures = updatedVideoLectures;

            // Update the courseDetails with the updated section
            updatedDetails.sections[sectionIndex] = section;
          }

          return updatedDetails;
        });

        // Update editedSectionDetails
        setEditedSectionDetails((prevDetails) => ({
          ...prevDetails,
          videoLectures: prevDetails.videoLectures.filter(
            (video) => video._id !== videoId
          ),
        }));

      } else {

      }
    } catch (error) {
      console.log(error);
    }
  }


  const handleCheckboxToggle = (fieldName) => {
    setEditableFields((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  useEffect(() => {
    console.log("Edit section details re rendered");
  })


  return (
    <form onSubmit={handleSubmit} className="section-edit-form">
      <label>
        <div className="checkbox-container">
          <input
            type="checkbox"
            className="checkbox"
            checked={editableFields.title}
            onChange={() => handleCheckboxToggle('title')}
          />
        </div>
        <div className={`input-container ${!editableFields.title ? 'not-editable' : ''}`}>
          <span className="text-label">Section Title:</span>
          <input
            type="text"
            name="title"
            value={editedSectionDetails.title}
            onChange={handleChange}
            readOnly={!editableFields.title}
          />
        </div>
      </label>
      <label>
        <div className="checkbox-container">
          <input
            type="checkbox"
            className="checkbox"
            checked={editableFields.description}
            onChange={() => handleCheckboxToggle('description')}
          />
        </div>
        <div className={`input-container ${!editableFields.description ? 'not-editable' : ''}`}>
          <span className="text-label">Section Description:</span>
          <textarea
            name="description"
            value={editedSectionDetails.description}
            onChange={handleChange}
            readOnly={!editableFields.description}
          />
        </div>
      </label>

      {editedSectionDetails.videoLectures.map((video, index) => (
        <div key={video._id} className="video-item">
          {selectedVideoForEdit === video ? (
            <EditVideoDetailsForm
              initialVideoDetails={{ ...video }}
              handleCancelEdit={handleCancelEdit}
              handleVideoDetailsSubmit={handleVideoDetailsSubmit}
              toggleShowEditForm={handleCancelEdit}
            />
          ) : (
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
                <div className="buttons">
                  <button onClick={() => handleEditClick(video)}>Edit</button>
                  <button onClick={() => handleDeleteClick(video)} className='delete'>Delete</button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="buttons">
        <button type="submit">Save Section Changes</button>
        <button onClick={toggleShowEditSectionForm}>Cancel Section Changes</button>
      </div>
    </form>
  );
}

export default EditSectionDetailsForm;
