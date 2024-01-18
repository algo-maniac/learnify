// CreateCourse.jsx
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './CreateCourseForm.css'

const CreateCourseForm = () => {
  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState({
    title: '',
    description: '',
    duration: 0,
    price: 0,
    level: 'beginner',
    category: '',
    thumbnail: null,
  });

  const [formDataa, setFormDataa] = useState({
    title: "title",
    description: "desc",
    video: null,
    thumbnail: null,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setCourseDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === 'file' ? e.target.files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', courseDetails.title);
    formData.append('description', courseDetails.description);
    formData.append('duration', courseDetails.duration);
    formData.append('price', courseDetails.price);
    formData.append('level', courseDetails.level);
    formData.append('category', courseDetails.category);
    formData.append('thumbnail', courseDetails.thumbnail);

    const res = await fetch('http://localhost:8000/course/createCourse', {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    console.log(data.ok);

    if (data.ok) {
      const courseId = data.courseId;
      // show toast success
      navigate(`/course/${courseId}/edit`);
    } else {
      // show toast err
    }
  };

  return (
    <form className="basic-details-form" onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={courseDetails.title} onChange={handleChange} required />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={courseDetails.description}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Duration (months):
        <input
          type="number"
          name="duration"
          value={courseDetails.duration}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Price (INR):
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
        Level:
        <select name="level" value={courseDetails.level} onChange={handleChange} required>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </label>
      <label>
        Category:
        <input
          type="text"
          name="category"
          value={courseDetails.category}
          onChange={handleChange}
        />
      </label>
      <label>
        Thumbnail:
        <input type="file" name="thumbnail" onChange={handleChange} accept="image/*" />
      </label>
      <button type="submit">Next</button>
    </form>
  );
};


export default CreateCourseForm;
