import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const EditVideoDetailsForm = ({
  initialVideoDetails,
  handleCancelEdit,
  handleVideoDetailsSubmit,
  toggleShowEditForm,
}) => {
  console.log(initialVideoDetails);
  const [editedVideoDetails, setEditedVideoDetails] = useState({
    ...initialVideoDetails,
  });
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

    console.log(editableFields);
    const formData = new FormData();
    if (editableFields["title"]) 
        formData.append("title", editedVideoDetails.title);
    if (editableFields["description"]) 
        formData.append("description", editedVideoDetails.description);
    if (editableFields["video"] && videoFile) 
        formData.append("video", videoFile);
    if (editableFields["thumbnail"] && thumbnailFile) 
        formData.append("description", editedVideoDetails);

    handleCancelEdit();

    handleVideoDetailsSubmit(
      formData,
      initialVideoDetails._id,
      initialVideoDetails.sectionId
    );
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
  });

  return (
    <Container>
      <form onSubmit={handleSubmit} className="section-edit-form">
        <label>
          <div className="checkbox-container">
            <input
              type="checkbox"
              className="checkbox"
              checked={editableFields.title}
              onChange={() => handleCheckboxToggle("title")}
            />
          </div>
          <div
            className={`input-container ${
              !editableFields.title ? "not-editable" : ""
            }`}
          >
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
              onChange={() => handleCheckboxToggle("description")}
            />
          </div>
          <div
            className={`input-container ${
              !editableFields.description ? "not-editable" : ""
            }`}
          >
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
                    onChange={() => handleCheckboxToggle("thumbnail")}
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
                    onChange={() => handleCheckboxToggle("video")}
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
                {(!editableFields.video || !videoFile) &&
                  initialVideoDetails.videoFile && (
                    <div className="file-preview">
                      <span>Video Preview:</span>
                      <video
                        id="my-player"
                        className="video-js"
                        controls
                        controlsList="nodownload"
                        poster={initialVideoDetails.thumbnail}
                        preload="auto"
                        data-setup="{}"
                      >
                        {initialVideoDetails.videoFile && (
                          <source
                            src={initialVideoDetails.videoFile}
                            type="video/mp4"
                          />
                        )}
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                {(editableFields.video || !initialVideoDetails.videoFile) &&
                  videoFile && (
                    <div className="file-preview">
                      <span>Video Preview:</span>
                      <video controls className="video-js">
                        {videoFile && (
                          <source
                            src={URL.createObjectURL(videoFile)}
                            type="video/mp4"
                          />
                        )}
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
              </div>
            </div>
          </label>
        </div>

        <div className="buttons">
          <button type="submit" onClick={handleSubmit}>
            Save Video Changes
          </button>
          <button type="button" onClick={toggleShowEditForm}>
            Cancel Video Changes
          </button>
        </div>
      </form>
    </Container>
  );
};

export default EditVideoDetailsForm;

const Container = styled.div`
  width: 100%;

  .section-edit-form {
    font-family: Arial, sans-serif;
  }

  .checkbox-container {
    display: inline-block;
    margin-right: 5px;
  }

  .checkbox {
    margin-right: 5px;
  }

  .input-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .not-editable {
    background-color: #f0f0f0; /* Add a background color for not editable fields */
  }

  .text-label {
    margin-right: 10px;
    /* width: 120px; Adjust the width as needed */
  }

  .thumbnailAndVideo {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }

  .thumbnailDetails,
  .videoDetails {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  .input-options {
    display: flex;
    align-items: center;
  }

  .file-preview {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
  }

  .file-preview span {
    margin-bottom: 5px;
  }

  .file-preview img,
  .file-preview video {
    width: 180px;
    height: 128px; /* 180px / 1.4 */
    object-fit: cover;
  }

  /* .buttons {
    margin-top: 20px;
  } */

  button {
    margin-right: 10px;
    padding: 8px 12px;
    cursor: pointer;
  }

  button:hover {
    background-color: #4caf50;
    color: white;
  }

  /* Add any additional styling as needed */
`;
