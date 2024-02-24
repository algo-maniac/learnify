import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CreateCourseForm = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState({
    title: "",
    description: "",
    duration: 0,
    price: 0,
    level: "beginner",
    category: "",
    thumbnail: null,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setCourseDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === "file" ? e.target.files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", courseDetails.title);
      formData.append("description", courseDetails.description);
      formData.append("duration", courseDetails.duration);
      formData.append("price", courseDetails.price);
      formData.append("level", courseDetails.level);
      formData.append("category", courseDetails.category);
      formData.append("thumbnail", courseDetails.thumbnail);

      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/course/createCourse`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: formData,
      });

      const data = await res.json();
      console.log(data);
      console.log(data.ok);

      if (data.ok) {
        const courseId = data.courseId;
        // show toast created course success
        setLoading(false);
        navigate(`/course/${courseId}/edit`);
      } else {
        // show toast err
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <form className="basic-details-form" onSubmit={handleSubmit}>
        <h3>Create Course</h3>
        <label>
          <span className="details-heading">Title:</span>
          <input
            type="text"
            name="title"
            value={courseDetails.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <span className="details-heading">Description:</span>
          <textarea
            name="description"
            value={courseDetails.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <span className="details-heading">Duration (months):</span>
          <input
            type="number"
            name="duration"
            value={courseDetails.duration}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <span className="details-heading">Price (INR):</span>
          <div className="price-input-container">
            <input
              type="number"
              name="price"
              value={courseDetails.price}
              onChange={handleChange}
              required
            />
            <span className="currency-label">INR</span>
          </div>
        </label>

        <label>
          <span className="details-heading">Level:</span>
          <select
            name="level"
            value={courseDetails.level}
            onChange={handleChange}
            required
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>
        <label>
          <span className="details-heading">Category:</span>
          <input
            type="text"
            name="category"
            value={courseDetails.category}
            onChange={handleChange}
          />
        </label>
        <label>
          <span className="details-heading">Thumbnail:</span>
          <input
            type="file"
            name="thumbnail"
            onChange={handleChange}
            accept="image/*"
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>
        {loading && <div className="toaster">Backend call in progress...</div>}
      </form>
    </Container>
  );
};

export default CreateCourseForm;

const Container = styled.div`
  width: 100%;
  /* BasicDetailsForm.css */
  .basic-details-form {
    width: 95%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #eaeaea;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin: 15px auto;
    background-color: rgb(255, 255, 255);
  }

  @media (min-width: 1401px) {
    .basic-details-form {
      width: 70%;
    }
  }

  .details-heading {
    font-size: 16px;
    font-weight: 600;
  }

  label {
    width: 100%;
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
    color: #333;
  }

  .basic-details-form input,
  textarea,
  select {
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
  }

  select {
    appearance: none;
  }

  .basic-details-form button {
    background-color: #4caf50;
    color: white;
    max-width: 200px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
  }

  .basic-details-form button {
    background-color: #4caf50;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    max-width: 200px;
  }

  .basic-details-form button:hover {
    background-color: #45a049;
  }

  .basic-details-form button[disabled] {
    background-color: rgb(130, 194, 123);
    /* Semi-transparent version of the original delete button color */
    color: #ffffff;
    cursor: not-allowed;
  }

  .price-input-container {
    display: flex;
    align-items: center;
  }

  .currency-label {
    margin-left: 10px;
    font-size: 16px;
    color: #666;
  }

  .toaster {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #333;
    color: #fff;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    z-index: 100000; /* Ensure it's above other elements */
    display: flex;
    align-items: center;
  }

  /* Add animation for toaster */
  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  /* Apply animation to toaster */
  .toaster {
    animation: slideIn 0.5s ease-in-out;
  }
`;
