import React, { useState } from 'react';
import './EditSectionDetailsForm.css';
import EditVideoDetailsForm from './EditVideoDetailsForm';
import { useEffect } from 'react';

const EditSectionDetailsForm = ({ initialSectionDetails, onSubmit, setCourseDetails, handleVideoDetailsSubmit, toggleShowEditSectionForm, loading, setLoading }) => {
  const [localLoading, setLocalLoading] = useState(false);
  const [editedSectionDetails, setEditedSectionDetails] = useState({ ...initialSectionDetails });
  const [editableFields, setEditableFields] = useState({
    title: false,
    description: false,
  });
  const [selectedVideoForEdit, setSelectedVideoForEdit] = useState(null);

  useEffect(() => {
    setEditedSectionDetails({ ...initialSectionDetails });
  }, [initialSectionDetails]);

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
    e.preventDefault();

    try {
      setLocalLoading(true);
      setLoading(true);
      const formData = new FormData();
      if (editableFields['title']) formData.append('title', editedSectionDetails.title);
      if (editableFields['description']) formData.append('description', editedSectionDetails.description);
      onSubmit(formData, initialSectionDetails._id);
    } catch (err) {

    } finally {
      setLocalLoading(false);
      setLoading(false);
    }
  };

  const handleDeleteClick = async (video) => {
    try {
      setLocalLoading(true);
      setLoading(true);
      const videoId = video._id;
      const sectionId = video.sectionId;
      console.log("inside handle video details submit");
      const res = await fetch(`http://localhost:8000/course/deleteVideo/${ videoId }`, {
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
        // setEditedSectionDetails((prevDetails) => ({
        //   ...prevDetails,
        //   videoLectures: prevDetails.videoLectures.filter(
        //     (video) => video._id !== videoId
        //   ),
        // }));

      } else {

      }
    } catch (error) {
      console.log(error);
    } finally {
      setLocalLoading(false);
      setLoading(false);
    }
  }


  const handleCheckboxToggle = (fieldName) => {
    setEditableFields((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };


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
        <div className={`input-container ${ !editableFields.title ? 'not-editable' : '' }`}>
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
        <div className={`input-container ${ !editableFields.description ? 'not-editable' : '' }`}>
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
              loading={loading}
              setLoading={setLoading}
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
                  <button onClick={() => handleEditClick(video)} disabled={loading}>Edit</button>
                  <button onClick={() => handleDeleteClick(video)} disabled={loading} className='delete'>Delete</button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="buttons">
        <button type="submit" disabled={loading}>
          {!localLoading ? 'Save Changes' : 'Saving Changes'}
        </button>
        <button onClick={toggleShowEditSectionForm} className='cancel'>Cancel Changes</button>
      </div>
    </form>
  );
}

export default EditSectionDetailsForm;
