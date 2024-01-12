import React, { useState } from 'react';

const SectionForm = () => {
  const [sectionTitle, setSectionTitle] = useState('');
  const [sectionDescription, setSectionDescription] = useState('');
  const [sectionImage, setSectionImage] = useState(null);
  const [videoLectures, setVideoLectures] = useState([{ title: '', description: '', videoFile: null }]);

  const handleVideoLectureChange = (index, key, value) => {
    const updatedVideoLectures = [...videoLectures];
    updatedVideoLectures[index][key] = value;
    setVideoLectures(updatedVideoLectures);
  };

  const handleAddVideoLecture = () => {
    setVideoLectures([...videoLectures, { title: '', description: '', videoFile: null }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('sectionTitle', sectionTitle);
    formData.append('sectionDescription', sectionDescription);
    formData.append('sectionImage', sectionImage);

    videoLectures.forEach((lecture, index) => {
      formData.append(`videoLectures[${index}][title]`, lecture.title);
      formData.append(`videoLectures[${index}][description]`, lecture.description);
      formData.append(`videoLectures[${index}][videoFile]`, lecture.videoFile);
    });

    try {
      const response = await fetch('http://your-server-endpoint/uploadSection', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        // Handle success, e.g., redirect or show a success message
      } else {
        // Handle error
        console.error('Failed to upload section');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Section Title:
        <input type="text" value={sectionTitle} onChange={(e) => setSectionTitle(e.target.value)} />
      </label>
      <br />
      <label>
        Section Description:
        <input type="text" value={sectionDescription} onChange={(e) => setSectionDescription(e.target.value)} />
      </label>
      <br />
      <label>
        Section Image:
        <input type="file" onChange={(e) => setSectionImage(e.target.files[0])} />
      </label>
      <br />
      <hr />
      {videoLectures.map((lecture, index) => (
        <div key={index}>
          <label>
            Video Title:
            <input
              type="text"
              value={lecture.title}
              onChange={(e) => handleVideoLectureChange(index, 'title', e.target.value)}
            />
          </label>
          <br />
          <label>
            Video Description:
            <input
              type="text"
              value={lecture.description}
              onChange={(e) => handleVideoLectureChange(index, 'description', e.target.value)}
            />
          </label>
          <br />
          <label>
            Video File:
            <input
              type="file"
              onChange={(e) => handleVideoLectureChange(index, 'videoFile', e.target.files[0])}
            />
          </label>
          <br />
          <hr />
        </div>
      ))}
      <button type="button" onClick={handleAddVideoLecture}>
        Add Video Lecture
      </button>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SectionForm;
