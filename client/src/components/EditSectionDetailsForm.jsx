import React, { useState } from "react";

import EditVideoDetailsForm from "./EditVideoDetailsForm";
import { useEffect } from "react";
import styled from "styled-components";

const EditSectionDetailsForm = ({
  initialSectionDetails,
  onSubmit,
  setCourseDetails,
  handleVideoDetailsSubmit,
  toggleShowEditSectionForm,
  loading,
  setLoading,
}) => {
  const [localLoading, setLocalLoading] = useState(false);
  const [editedSectionDetails, setEditedSectionDetails] = useState({
    ...initialSectionDetails,
  });
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
      if (editableFields["title"])
        formData.append("title", editedSectionDetails.title);
      if (editableFields["description"])
        formData.append("description", editedSectionDetails.description);
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
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/course/deleteVideo/${videoId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

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
  };

  const handleCheckboxToggle = (fieldName) => {
    setEditableFields((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

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
              onChange={() => handleCheckboxToggle("description")}
            />
          </div>
          <div
            className={`input-container ${
              !editableFields.description ? "not-editable" : ""
            }`}
          >
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
              <div className="video-item-details">
                <div className="video">
                  <video
                    id="my-player"
                    className="video-js"
                    controls
                    controlsList="nodownload"
                    poster={video.thumbnail}
                    preload="auto"
                    data-setup="{}"
                  >
                    {video.videoFile && <source src={video.videoFile}></source>}
                  </video>
                </div>
                <div className="details">
                  <div>{video.title}</div>
                  <div>{video.description}</div>
                  <div className="buttons">
                    <button
                      onClick={() => handleEditClick(video)}
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(video)}
                      disabled={loading}
                      className="delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="buttons">
          <button type="submit" disabled={loading}>
            {!localLoading ? "Save Changes" : "Saving Changes"}
          </button>
          <button onClick={toggleShowEditSectionForm} className="cancel">
            Cancel Changes
          </button>
        </div>
      </form>
    </Container>
  );
};

export default EditSectionDetailsForm;

const Container = styled.div`
  /* EditSectionDetailsForm.css */
  width: 100%;

  .section-edit-form {
    width: 100%;
    margin-top: 20px;
    padding: 10px;
    background-color: #f8f8f8;
    box-shadow: 1px 1px 5px #ddd;
  }

  .section-edit-form label {
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .section-edit-form label .input-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .checkbox-container {
    display: inline-block;
    margin-right: 10px;
  }

  .checkbox {
    margin-top: 2px;
  }

  .input-container {
    margin-bottom: 10px;
  }

  .not-editable {
    background-color: #f5f5f5;
  }

  .text-label {
    display: block;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
    color: #333;
  }

  textarea,
  input[type="text"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    margin-top: 5px;
  }

  .file-preview {
    margin-top: 10px;
  }

  .file-preview img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    margin-top: 5px;
  }

  .buttons {
    margin-top: 20px;
  }

  /* .buttons button {
    background-color: #4caf50;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-right: 10px;
  }
  
  .buttons button:hover {
    background-color: #45a049;
  } */
`;
