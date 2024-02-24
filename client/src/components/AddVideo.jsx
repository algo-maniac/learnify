import React, { useState } from "react";
import styled from "styled-components";

const AddVideo = ({
  courseId,
  sectionId,
  setCourseDetails,
  handleAddVideoClick,
  loading,
  setLoading,
}) => {
  const [localLoading, setLocalLoading] = useState(false);
  const [videoDetails, setVideoDetails] = useState({
    title: "",
    description: "",
    video: null,
    thumbnail: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setVideoDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    console.log("here");
    try {
      setLocalLoading(true);
      setLoading(true);
      const form = new FormData();
      form.append("courseId", courseId);
      form.append("sectionId", sectionId);
      form.append("title", videoDetails.title);
      form.append("description", videoDetails.description);
      form.append("video", videoDetails.video);
      form.append("thumbnail", videoDetails.thumbnail);
      console.log(videoDetails);

      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/course/uploadCourseVideo`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          body: form,
        }
      );
      const data = await res.json();
      const newVideo = data.video;
      console.log("here2");
      console.log(data);
      if (!newVideo) {
        // show err
      } else {
        setCourseDetails((prevDetails) => {
          const updatedSections = prevDetails.sections.map((section) => {
            if (section._id === sectionId) {
              return {
                ...section,
                videoLectures: [...section.videoLectures, newVideo],
              };
            }
            return section;
          });

          return {
            ...prevDetails,
            sections: updatedSections,
          };
        });

        setVideoDetails({
          title: "",
          description: "",
          video: null,
          thumbnail: null,
        });
        console.log("here");
        console.log(sectionId);
        handleAddVideoClick(sectionId);

        // Toast Video Uploaded Successfully
      }
    } catch (err) {
    } finally {
      setLocalLoading(false);
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="add-video-form">
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={videoDetails.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={videoDetails.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Video File:
          <input
            type="file"
            name="video"
            onChange={handleChange}
            accept="video/*"
          />
        </label>
        <label>
          Thumbnail:
          <input
            type="file"
            name="thumbnail"
            onChange={handleChange}
            accept="image/*"
          />
        </label>
        <button onClick={handleUpload} disabled={loading}>
          {!localLoading ? "Upload Video" : "Uploading..."}
        </button>
      </div>
    </Container>
  );
};

export default AddVideo;

const Container = styled.div`
  /* Add this CSS to your stylesheet or in your component style tag */

  .add-video-form {
    /* max-width: 400px; */
    width: 100%;
    margin: 20px auto;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .add-video-form label {
    display: block;
    margin-bottom: 10px;
  }

  .add-video-form input,
  .add-video-form textarea,
  .add-video-form button {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    box-sizing: border-box;
  }

  .add-video-form button {
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }

  .add-video-form button:hover {
    background-color: #45a049;
  }
`;
