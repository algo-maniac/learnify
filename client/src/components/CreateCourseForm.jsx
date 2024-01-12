import React, { useState } from 'react';

const CourseForm = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    sections: [{ title: '', description: '', lectures: [{ title: '', description: '', videoFile: null }] }],
  });

  const handleInputChange = (e, sectionIndex, lectureIndex) => {
    const { name, value, files } = e.target;

    if (lectureIndex !== undefined) {
      const updatedSections = [...courseData.sections];
      updatedSections[sectionIndex].lectures[lectureIndex][name] = files ? files[0] : null;      
      setCourseData({ ...courseData, sections: updatedSections });
    } else if (sectionIndex !== undefined) {
      const updatedSections = [...courseData.sections];
      updatedSections[sectionIndex][name] = value;
      setCourseData({ ...courseData, sections: updatedSections });
    } else {
      setCourseData({ ...courseData, [name]: value });
    }
  };

  const addSection = () => {
    setCourseData({
      ...courseData,
      sections: [...courseData.sections, { title: '', description: '', lectures: [{ title: '', description: '', videoFile: null }] }],
    });
  };

  const addLecture = (sectionIndex) => {
    const updatedSections = [...courseData.sections];
    updatedSections[sectionIndex].lectures.push({ title: '', description: '', videoFile: null });
    setCourseData({ ...courseData, sections: updatedSections });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this with your actual form submission logic
    console.log(courseData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Course Title:
        <input type="text" name="title" value={courseData.title} onChange={(e) => handleInputChange(e)} />
      </label>
      <br />
      <label>
        Course Description:
        <textarea name="description" value={courseData.description} onChange={(e) => handleInputChange(e)} />
      </label>
      <br />
      <label>
        Price:
        <input type="text" name="price" value={courseData.price} onChange={(e) => handleInputChange(e)} />
      </label>
      <br />
      <label>
        Duration:
        <input type="text" name="duration" value={courseData.duration} onChange={(e) => handleInputChange(e)} />
      </label>
      <br />

      {courseData.sections.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <label>
            Section Title:
            <input
              type="text"
              name="title"
              value={section.title}
              onChange={(e) => handleInputChange(e, sectionIndex)}
            />
          </label>
          <br />
          <label>
            Section Description:
            <textarea
              name="description"
              value={section.description}
              onChange={(e) => handleInputChange(e, sectionIndex)}
            />
          </label>
          <br />
          {section.lectures.map((lecture, lectureIndex) => (
            <div key={lectureIndex}>
              <label>
                Lecture Title:
                <input
                  type="text"
                  name="title"
                  value={lecture.title}
                  onChange={(e) => handleInputChange(e, sectionIndex, lectureIndex)}
                />
              </label>
              <br />
              <label>
                Lecture Description:
                <textarea
                  name="description"
                  value={lecture.description}
                  onChange={(e) => handleInputChange(e, sectionIndex, lectureIndex)}
                />
              </label>
              <br />
              <label>
                Video File:
                <input
                  type="file"
                  name="videoFile"
                  onChange={(e) => handleInputChange(e, sectionIndex, lectureIndex)}
                />
              </label>
              <br />
            </div>
          ))}
          <button type="button" onClick={() => addLecture(sectionIndex)}>
            Add Lecture
          </button>
        </div>
      ))}
      <button type="button" onClick={addSection}>
        Add Section
      </button>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CourseForm;
