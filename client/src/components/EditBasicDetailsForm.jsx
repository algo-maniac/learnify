import React, { useState } from "react";
import styled from "styled-components";

const EditBasicDetailsForm = ({
  initialDetails,
  onSubmit,
  toggleShowEditForm,
  loading,
  setLoading,
}) => {
  console.log(initialDetails);
  const [localLoading, setLocalLoading] = useState(false);
  const [editedDetails, setEditedDetails] = useState({ ...initialDetails });
  const [editedThumbnail, setEditedThumbnail] = useState(null);
  const [editableFields, setEditableFields] = useState({
    title: false,
    description: false,
    duration: false,
    price: false,
    level: false,
    category: false,
    thumbnail: false,
  });
  const [showThumbnailConfirmation, setShowThumbnailConfirmation] =
    useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setEditedDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(editedDetails);
  };

  const handleThumbnailChange = (e) => {
    setEditedThumbnail(e.target.files[0]);
    setShowThumbnailConfirmation(true);
  };

  const handleConfirmThumbnailChange = () => {
    setShowThumbnailConfirmation(false);
  };

  const handleCancelThumbnailChange = () => {
    setEditedDetails((prev) => ({
      ...prev,
      thumbnail: initialDetails.thumbnail,
    }));
    setShowThumbnailConfirmation(false);
    setEditedDetails((prev) => {
      return {
        ...prev,
        thumbnail: null,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setLocalLoading(true);
      onSubmit(editedDetails, editedThumbnail, editableFields);
    } catch (err) {
    } finally {
      setLocalLoading(false);
      setLoading(false);
    }
  };

  const handleCheckboxToggle = (fieldName, e) => {
    console.log(e.target);
    console.log(e.target.type === "checkbox");
    if (e.target.type === "checkbox") {
      if (editableFields[fieldName]) {
        setEditedDetails((prev) => ({
          ...prev,
          [fieldName]: initialDetails[fieldName],
        }));
      }
      setEditableFields((prev) => ({
        ...prev,
        [fieldName]: !prev[fieldName],
      }));
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} className="basic-edit-form">
        <label>
          <div className="checkbox-container">
            <input
              type="checkbox"
              className="checkbox"
              checked={editableFields.title}
              onChange={(e) => handleCheckboxToggle("title", e)}
            />
          </div>
          <div
            className={`input-container ${
              !editableFields.title ? "not-editable" : ""
            }`}
          >
            <span className="text-label">Title:</span>
            <input
              type="text"
              name="title"
              value={editedDetails.title}
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
              onChange={(e) => handleCheckboxToggle("description", e)}
            />
          </div>
          <div
            className={`input-container ${
              !editableFields.description ? "not-editable" : ""
            }`}
          >
            <span className="text-label">Description:</span>
            <textarea
              name="description"
              value={editedDetails.description}
              onChange={handleChange}
              readOnly={!editableFields.description}
            />
          </div>
        </label>
        <label>
          <div className="checkbox-container">
            <input
              type="checkbox"
              className="checkbox"
              checked={editableFields.duration}
              onChange={(e) => handleCheckboxToggle("duration", e)}
            />
          </div>
          <div
            className={`input-container ${
              !editableFields.duration ? "not-editable" : ""
            }`}
          >
            <span className="text-label">Duration (months):</span>
            <input
              type="number"
              name="duration"
              value={editedDetails.duration}
              onChange={handleChange}
              readOnly={!editableFields.duration}
            />
          </div>
        </label>
        <label>
          <div className="checkbox-container">
            <input
              type="checkbox"
              className="checkbox"
              checked={editableFields.price}
              onChange={(e) => handleCheckboxToggle("price", e)}
            />
          </div>
          <div
            className={`input-container ${
              !editableFields.price ? "not-editable" : ""
            }`}
          >
            <span className="text-label">Price (INR):</span>
            <input
              type="number"
              name="price"
              value={editedDetails.price}
              onChange={handleChange}
              readOnly={!editableFields.price}
            />
          </div>
        </label>
        <label>
          <div className="checkbox-container">
            <input
              type="checkbox"
              className="checkbox"
              checked={editableFields.level}
              onChange={(e) => handleCheckboxToggle("level", e)}
            />
          </div>
          <div
            className={`input-container ${
              !editableFields.level ? "not-editable" : ""
            }`}
          >
            <span className="text-label">Level:</span>
            <select
              name="level"
              value={editedDetails.level}
              onChange={handleChange}
              readOnly={!editableFields.level}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </label>
        <label>
          <div className="checkbox-container">
            <input
              type="checkbox"
              className="checkbox"
              checked={editableFields.category}
              onChange={(e) => handleCheckboxToggle("category", e)}
            />
          </div>
          <div
            className={`input-container ${
              !editableFields.category ? "not-editable" : ""
            }`}
          >
            <span className="text-label">Category:</span>
            <input
              type="text"
              name="category"
              value={editedDetails.category}
              onChange={handleChange}
              readOnly={!editableFields.category}
            />
          </div>
        </label>
        <label>
          <div className="checkbox-container">
            <input
              type="checkbox"
              className="checkbox"
              checked={editableFields.thumbnail}
              onChange={(e) => handleCheckboxToggle("thumbnail", e)}
            />
          </div>
          <div
            className={`input-container ${
              !editableFields.thumbnail ? "not-editable" : ""
            }`}
          >
            <span className="text-label">Thumbnail:</span>
            <input
              type="file"
              name="thumbnail"
              onChange={handleThumbnailChange}
              accept="image/*"
              disabled={!editableFields.thumbnail}
            />
            {showThumbnailConfirmation && (
              <div>
                <img
                  src={URL.createObjectURL(editedThumbnail)}
                  alt="Thumbnail Preview"
                  style={{ maxWidth: "150px", maxHeight: "150px" }}
                />
                <div className="buttons">
                  <button onClick={handleConfirmThumbnailChange}>
                    Confirm Thumbnail Change
                  </button>
                  <button
                    onClick={handleCancelThumbnailChange}
                    className="cancel"
                  >
                    Cancel Thumbnail Change
                  </button>
                </div>
              </div>
            )}
          </div>
        </label>
        <div className="buttons">
          <button onClick={handleSubmit} disabled={loading}>
            {!localLoading ? "Submit" : "Submitting..."}
          </button>
          <button onClick={toggleShowEditForm} className="cancel">
            Cancel Changes
          </button>
        </div>
        {/* {localLoading && <div className="loader">Loading...</div>} */}
        {localLoading && (
          <div className="toaster">Backend call in progress...</div>
        )}
      </form>
    </Container>
  );
};

export default EditBasicDetailsForm;

const Container = styled.div`
  width: 100%;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .basic-edit-form label {
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .basic-edit-form label .input-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .checkbox {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  .input-container {
    display: flex;
    flex-direction: column;
  }

  /* ... (previous styles) */

  .checkbox-label {
    display: flex;
    align-items: center;
  }

  .checkbox {
    margin-right: 15px;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .text-label {
    margin-bottom: 5px;
  }

  /* ... (remaining styles) */

  /* Styles for checked state */
  .checkbox:checked + .input-container .text-label {
    display: block;
  }

  .basic-edit-form label,
  input,
  textarea,
  select,
  button {
    margin-top: 5px;
    padding: 5px;
    font-size: 16px;
    width: 100%;
  }

  /* ... rest of the styles ... */

  /* Adjust for checkboxes */
  input[type="checkbox"] {
    margin-top: 0; /* Remove default top margin */
    margin-right: 5px; /* Add margin between checkbox and label */
  }

  /* .edit-course-container button {
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    max-width: 200px !important;
  }
   */
  /* button:hover {
    background-color: #45a049;
  } */

  img {
    margin-top: 10px;
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
  }

  .not-editable {
    background-color: #f2f2f2; /* Light gray background */
    border: 1px solid #ccc; /* Light border color */
    padding: 8px;
    opacity: 0.7; /* Reduced opacity for a subtle effect */
    cursor: not-allowed; /* Change cursor to not-allowed */
    padding: 5px;
  }

  .not-editable input,
  .not-editable textarea,
  .not-editable select {
    background-color: transparent; /* Make input fields transparent within not-editable container */
    border: none; /* Remove borders within not-editable container */
    color: #555; /* Adjust text color */
    padding: 0;
  }

  .not-editable button {
    background-color: #ddd; /* Light button background color */
    color: #777; /* Adjust button text color */
    cursor: not-allowed; /* Change cursor to not-allowed */
  }
`;
