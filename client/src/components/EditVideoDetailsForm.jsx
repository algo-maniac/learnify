import React, { useState } from 'react';
import './EditVideoDetailsForm.css';
import { useEffect } from 'react';

const EditVideoDetailsForm = ({ initialVideoDetails, handleCancelEdit, handleVideoDetailsSubmit, toggleShowEditForm }) => {
  console.log(initialVideoDetails);
  const [editedVideoDetails, setEditedVideoDetails] = useState({ ...initialVideoDetails });
  const [editableFields, setEditableFields] = useState({
    title: false,
    description: false,
    thumbnail: false,
    video: false,
  });
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedVideoDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleThumbnailChange = (e) => {
    setThumbnailFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    console.log("inside handle submit");
    e.preventDefault();
    // Include thumbnail and video files in the form data for submission
    const formData = new FormData();
    if (editableFields['title']) formData.append('title', editedVideoDetails.title);
    if (editableFields['description']) formData.append('description', editedVideoDetails.description);
    if (editableFields['video'] && videoFile) formData.append('video', videoFile);
    if (editableFields['thumbnail'] && thumbnailFile) formData.append('description', editedVideoDetails);

    // Add more fields as needed
    handleCancelEdit();
    // Submit the form data
    handleVideoDetailsSubmit(formData, initialVideoDetails._id, initialVideoDetails.sectionId);
  };

  const handleCheckboxToggle = (fieldName) => {
    setEditableFields((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
    console.log(editableFields);
  };

  useEffect(() => {
    console.log("Edit video details re rendered");
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
          <span className="text-label">Video Title:</span>
          <input
            type="text"
            name="title"
            value={editedVideoDetails.title}
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
          <span className="text-label">Video Description:</span>
          <textarea
            name="description"
            value={editedVideoDetails.description}
            onChange={handleChange}
            readOnly={!editableFields.description}
          />
        </div>
      </label>

      <div className="thumbnailAndVideo">
        <label>
          <div className="thumbnailDetails">
            <div className="input-options">
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={editableFields.thumbnail}
                  onChange={() => handleCheckboxToggle('thumbnail')}
                />
              </div>
              <span className="text-label">Thumbnail:</span>
              <input
                type="file"
                name="thumbnail"
                onChange={handleThumbnailChange}
                accept="image/*"
                disabled={!editableFields.thumbnail}
              />
            </div>
            <div className="preview">
              {editableFields.thumbnail && thumbnailFile && (
                <div className="file-preview">
                  <span>Thumbnail Preview:</span>
                  <img
                    src={URL.createObjectURL(thumbnailFile)}
                    alt="Thumbnail Preview"
                  />
                </div>
              )}
              {(!editableFields.thumbnail || !thumbnailFile) && (
                <div className="file-preview">
                  <span>Thumbnail Preview:</span>
                  <img
                    src={initialVideoDetails.thumbnail}
                    alt="Thumbnail Preview"
                  />
                </div>
              )}
            </div>
          </div>
        </label>

        {/* Video Input */}
        <label>
          <div className="videoDetails">
            <div className="input-options">
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={editableFields.video}
                  onChange={() => handleCheckboxToggle('video')}
                />
              </div>
              <span className="text-label">Video:</span>
              <input
                type="file"
                name="video"
                onChange={handleVideoChange}
                accept="video/*"
                disabled={!editableFields.video}
              />
            </div>
            <div className="preview">
              {(!editableFields.video || !videoFile) && initialVideoDetails.videoFile && (
                <div className="file-preview">
                  <span>Video Preview:</span>
                  <video
                    id="my-player"
                    className="video-js"
                    controls
                    controlsList="nodownload"
                    poster={initialVideoDetails.thumbnail}
                    preload="auto"
                    data-setup='{}'>
                    {initialVideoDetails.videoFile && <source src={initialVideoDetails.videoFile} type="video/mp4" />}
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
              {(editableFields.video || !initialVideoDetails.videoFile) && videoFile && (
                <div className="file-preview">
                  <span>Video Preview:</span>
                  <video controls className='video-js'>
                    {videoFile && <source src={URL.createObjectURL(videoFile)} type="video/mp4" />}
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          </div>
        </label>
      </div>


      <div className="buttons">
        <button type="submit" onClick={handleSubmit}>Save Video Changes</button>
        <button type="button" onClick={toggleShowEditForm}>
          Cancel Video Changes
        </button>
      </div>
    </form>
  );
};

export default EditVideoDetailsForm;