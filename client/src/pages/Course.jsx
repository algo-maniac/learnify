import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import AuthContext from "../store/auth-context";

const Course = () => {
  const { courseId } = useParams();
  const {userdata} = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [courseDetails, setCourseDetails] = useState({
    _id: "",
    title: "",
    description: "",
    duration: 0,
    price: 0,
    level: "beginner",
    category: "",
    thumbnail: "",
    videoFile: "",
    sections: [],
    hasAccess: null
  });
  const [hasAccess, setHasAccess] = useState(null);


  const fetchCourseDetails = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/course/getCourse/${ courseId }`,
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const data = await res.json();
    console.log(data);
    if (data.ok) {
      setCourseDetails(data.course);
      setCourseDetails(prev => ({...prev, hasAccess: data.hasAccess}));
      setHasAccess(data.hasAccess);
      console.log(data.course);
      console.log(data.course.thumbnail);
    } else {
    }
  };

  const handleEnrollment = async () => {
      const data = await fetch(`${process.env.REACT_APP_BASE_URL}/course/enroll/${ courseId }`, {
          method: 'POST',
          headers: {
              Authorization: localStorage.getItem("token"),
              'Content-type': 'application/json'
          },
      });
      const json = await data.json();
      console.log(json)
      if (json.ok) {
        // setCourseDetails(prev => {
        //   return {
        //     ...prev, hasAccess: !prev.hasAccess
        //   }
        // })
        setHasAccess(prev => !prev);
      }
  }

  const handleRevertEnrollment = async () => {
      const data = await fetch(`${process.env.REACT_APP_BASE_URL}/course/revertEnroll/${ courseId }`, {
          method: 'POST',
          headers: {
              Authorization: localStorage.getItem("token"),
              'Content-type': 'application/json'
          },
      });
      const json = await data.json();
      console.log(json)
      if (json.ok) {
        // setCourseDetails(prev => {
        //   return {
        //     ...prev, hasAccess: !prev.hasAccess
        //   }
        // })
        setHasAccess(prev => !prev);
      }
  }

  useEffect(() => {
    fetchCourseDetails();
  }, [hasAccess]);

  useEffect(() => {
    console.log("Edit course form re rendered");
  });

  return (
    <Container>
      <div className="edit-course-container">
        <div className="basic-details">
          <div className="test-details">
            <div className="all-details">
              <div className="details">
                <h2>Title: {courseDetails.title}</h2>
                <p>
                  <span className="detais-heading">Description:</span>{" "}
                  {courseDetails.description}
                </p>
                <p>
                  <span className="detais-heading">Duration:</span>{" "}
                  {courseDetails.duration} months
                </p>
                <p>
                  <span className="detais-heading">Price:</span>{" "}
                  {courseDetails.price} INR
                </p>
                <p>
                  <span className="detais-heading">Level:</span>{" "}
                  {courseDetails.level}
                </p>
                <p>
                  <span className="detais-heading">Category:</span>{" "}
                  {courseDetails.category}
                </p>
              </div>
              {courseDetails && courseDetails.thumbnail && (
                <div className="thumbnail-container">
                  <img src={courseDetails.thumbnail} alt="Course Thumbnail" />
                </div>
              )}
            </div>
          </div>
        </div>

        <h3>Sections</h3>

        {courseDetails.sections &&
          courseDetails.sections.map((section) => (
            <React.Fragment key={section._id}>
              <ul className="sections-list">
                <li className="section-item">
                  <div className="section-title">{section.title}</div>
                  <div className="section-description">
                    {section.description}
                  </div>
                  {section.videoLectures &&
                    section.videoLectures.length > 0 && (
                      <div className="videos-container">
                        {section.videoLectures.map((video) => (
                          <Link to={`/video/${ video._id }`} key={video._id} className="video-item">
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
                                  {video.videoFile && (
                                    <source src={video.videoFile}></source>
                                  )}
                                </video>
                              </div>
                              <div className="details">
                                <div>{video.title}</div>
                                <div>{video.description}</div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}


                </li>
              </ul>
            </React.Fragment>
          ))}

        {/* {loading && <div className="loader">Loading...</div>} */}
        {courseDetails.instructorId !== userdata.id && (courseDetails.hasAccess 
          ? <button onClick={handleRevertEnrollment}>Revert Enrollment</button>
          : <button onClick={handleEnrollment}>Enroll</button>)}
        {loading && <div className="toaster">Backend call in progress...</div>}
      </div>
    </Container>
  );
};

export default Course;

const Container = styled.div`
  width: 100%;
  margin: 0;

  .edit-course-container {
    width: 70%;
    max-width: 1000px;
    margin: 15px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .test-details {
    width: 100%;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
  }

  .test-details h2 {
    font-size: 2em;
    margin-bottom: 10px;
  }

  .test-details p {
    color: #555;
    margin-bottom: 15px;
  }

  /* Adjust colors and styles based on your design preferences */

  /* Header styling */
  .edit-course-container h2 {
    color: #333;
    font-size: 24px;
    margin-bottom: 10px;
  }

  .edit-course-container h3 {
    color: #333;
    font-size: 20px;
    margin-bottom: 10px;
  }

  /* Details styling */
  .edit-course-container p {
    color: #555;
    margin: 5px 0;
    font-size: 16px;
  }

  .edit-course-container label {
    width: 100%;
  }

  .basic-details {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 30px;
  }

  .all-details {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }

  .details {
    flex: 0 0 60%; /* Takes up 1/2 of the available space */
    width: 60%; /* Same effect as flex: 1 */
  }

  .details .detais-heading {
    font-size: 16px;
    font-weight: 600;
  }

  .thumbnail-container {
    flex: 0 0 40%; /* Takes up 1/2 of the available space */
    width: 60%; /* Same effect as flex: 1 */
  }

  /* Thumbnail styling */
  .thumbnail-container {
    padding: 10px;
    margin-bottom: 10px;
    /* width: 400px; */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .thumbnail-container img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 4px;
    position: relative;
  }

  /* Sections styling */
  .edit-course-container ul {
    list-style: none;
    padding: 0;
    margin: 10px 0;
  }

  .edit-course-container ul li {
    color: #333;
    font-size: 16px;
    margin-bottom: 5px;
  }

  /* Button styling */
  /* .edit-course-container button {
    background-color: #4caf50;
    color: #fff;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
  } */

  /* .edit-course-container button:hover {
    background-color: #45a049;
  } */

  /* Add this CSS to your stylesheet or in your component style tag */

  .sections-list {
    list-style: none;
    padding: 0;
  }

  .section-item {
    border: 1px solid #ddd;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 8px;
    background-color: #f5f5f5;
  }

  .section-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .section-description {
    font-size: 14px;
    color: #555;
    margin-bottom: 10px;
  }

  .videos-container {
    /* width: 90%; */
    display: flex;
    flex-direction: column;
    /* overflow-x: auto; */
  }

  .video-item {
    display: flex;
    width: 100%;
    gap: 20px;
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
  }

  .video-item img {
    max-width: 100px;
    height: auto;
    border-radius: 6px;
    margin-right: 20px;
    position: relative;
  }

  .video-item-details {
    display: flex;
    flex-direction: row;
    /* justify-content: center; */
    gap: 20px;
    width: 100%;
  }

  .video-item-details div {
    width: 100%;
    margin-bottom: 8px;
    font-size: 14px;
    color: #333;
  }

  .details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .add-video-form {
    margin-top: 20px;
    background-color: white;
  }

  /* Add more styles as needed */

  .video-js {
    width: 180px;
  }

  /* .buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
} */

  .loader {
    display: inline-block;
    border: 4px solid #f3f3f3;
    border-radius: 50%;
    border-top: 4px solid #3498db;
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
    margin-right: 8px; /* Adjust spacing as needed */
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
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

  .buttons {
    width: 100%;
    display: flex;
    flex-direction: row;

    justify-content: flex-end;
    gap: 40px;
  }

  .edit-course-container button {
    background-color: #4caf50;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    max-width: 200px;
  }

  .edit-course-container .cancel {
    background-color: #f39c12;
  }

  .edit-course-container .delete {
    background-color: rgb(253, 68, 68);
    color: white;
  }

  .edit-course-container .delete:hover {
    background-color: rgb(193, 70, 70);
    color: rgb(255, 255, 255);
  }

  .edit-course-container button[disabled] {
    background-color: rgb(
      130,
      194,
      123
    ); /* Semi-transparent version of the original delete button color */
    color: #ffffff;
    cursor: not-allowed;
  }

  .edit-course-container button.delete[disabled] {
    background-color: rgba(231, 76, 60, 0.6);
    color: #edecec;
    cursor: not-allowed;
  }

  .edit-course-container button.delete[disabled] {
    background-color: rgba(231, 76, 60, 0.6);
    color: #edecec;
    cursor: not-allowed;
  }
`;
