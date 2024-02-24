// AddSectionForm.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const AddSectionForm = ({
  setCourseDetails,
  handleAddSectionClick,
  loading,
  setLoading,
}) => {
  const { courseId } = useParams();

  console.log(courseId);
  const [sectionDetails, setSectionDetails] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSectionDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      // formData.append('courseId', courseId);
      formData.append("title", sectionDetails.title);
      formData.append("description", sectionDetails.description);

      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/course/createSection/${courseId}`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          body: formData,
        }
      );

      const data = await res.json();
      console.log(data);
      console.log(data.ok);

      if (data.ok) {
        // const sectionId = data.sectionId;

        setCourseDetails((prevCourseDetails) => {
          return {
            ...prevCourseDetails,
            sections: [...prevCourseDetails.sections, data.section],
          };
        });

        // Toast Section Added Successfully
        setSectionDetails({
          title: "",
          description: "",
        });
        handleAddSectionClick();
        // show toast success
        // navigate(`/course/${courseId}/edit`);
      } else {
        // show toast err
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} className="add-section-form">
        <label>
          Section Title:
          <input
            type="text"
            name="title"
            value={sectionDetails.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Section Description:
          <textarea
            name="description"
            value={sectionDetails.description}
            onChange={handleChange}
            required
          />
        </label>
        <div className="buttons">
          <button type="submit">Save Section</button>
        </div>
      </form>
    </Container>
  );
};

export default AddSectionForm;

const Container = styled.div`
  .add-section-form {
    width: 100%;
    margin: 20px auto;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .add-section-form label {
    display: block;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column !important;
  }

  .add-section-form input,
  .add-section-form textarea,
  .add-section-form button {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    box-sizing: border-box;
  }

  .add-section-form button {
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }

  .add-section-form button:hover {
    background-color: #45a049;
  }
`;
