import { useNavigate, useParams } from "react-router-dom";
import AddSectionForm from "../components/AddSectionForm";
import AddVideo from "../components/AddVideo";
import EditBasicDetailsForm from "../components/EditBasicDetailsForm";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import EditSectionDetailsForm from "../components/EditSectionDetailsForm";

const EditCourseForm = () => {
  const { courseId } = useParams();
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
  });

  const [showAddSectionForm, setShowAddSectionForm] = useState(false);
  const [sectionAddVideoState, setSectionAddVideoState] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);
  const [showEditSectionForm, setShowEditSectionForm] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  const handleAddVideoClick = (sectionId) => {
    setSectionAddVideoState((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const fetchCourseDetails = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/course/getCourseDetailsForEdit/${courseId}`,
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
      console.log(data.course);
      console.log(data.course.thumbnail);
    } else {
    }
  };
  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const handleAddSectionClick = () => {
    setShowAddSectionForm((prev) => !prev);
  };

  const handleBasicDetailsSubmit = async (
    editedDetails,
    editedThumbnail,
    editableFields
  ) => {
    try {
      setLoading(true);
      console.log(editedDetails);
      console.log(editedThumbnail);
      const formData = new FormData();
      if (editableFields["title"])
        formData.append("title", editedDetails.title);
      if (editableFields["description"])
        formData.append("description", editedDetails.description);
      if (editableFields["duration"])
        formData.append("duration", editedDetails.duration);
      if (editableFields["price"])
        formData.append("price", editedDetails.price);
      if (editableFields["level"])
        formData.append("level", editedDetails.level);
      if (editableFields["category"])
        formData.append("category", editedDetails.category);
      if (editableFields["thumbnail"])
        formData.append("thumbnail", editedThumbnail);

      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/course/editBasicCourseDetails/${courseId}`,
        {
          method: "PUT",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          body: formData,
        }
      );

      const data = await res.json();

      console.log(data);
      if (data.ok) {
        console.log(data.course);
        setCourseDetails((prevCourseDetails) => {
          return {
            ...prevCourseDetails,
            ...data.course,
          };
        });

        // Toast Basic Details Updated Succ.
        console.log(data.course);
        console.log(data.course.thumbnail);
        toggleShowEditForm();
      } else {
      }
    } catch (error) {
      // Handle error
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  };

  const toggleShowEditForm = () => {
    setShowEditForm((prev) => !prev);
  };

  const handleEditSectionClick = (sectionId) => {
    const sectionToEdit = courseDetails.sections.find(
      (section) => section._id === sectionId
    );
    setSelectedSection(sectionToEdit);
    setShowEditSectionForm(true);
  };

  const handleSectionDetailsSubmit = async (formData, sectionId) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/course/editSectionDetails/${courseId}/${sectionId}`,
        {
          method: "PUT",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          body: formData,
        }
      );

      const data = await res.json();

      console.log(data);
      if (data.ok) {
        const updatedSection = data.updatedSection;
        setCourseDetails((prevDetails) => {
          const updatedCourseDetails = { ...prevDetails };

          const sectionIndex = updatedCourseDetails.sections.findIndex(
            (section) => section._id === sectionId
          );

          if (sectionIndex !== -1) {
            const previousSection = updatedCourseDetails.sections[sectionIndex];
            updatedCourseDetails.sections[sectionIndex] = {
              ...previousSection,
              ...updatedSection,
            };
          }
          // Toast Section Updated Successfully
          return updatedCourseDetails;
        });
        setShowEditSectionForm(false);
      } else {
      }
    } catch (error) {
      // Handle error
    }
    setShowEditSectionForm(false);
  };

  const handleVideoDetailsSubmit = async (formData, videoId, sectionId) => {
    try {
      console.log("inside handle video details submit");
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/course/editVideoDetails/${videoId}`,
        {
          method: "PUT",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          body: formData,
        }
      );

      const data = await res.json();
      console.log(data);

      if (data.ok) {
        const updatedVideoDetails = data.video;
        console.log("updatedVideoDetails", updatedVideoDetails);
        console.log("videoId", videoId, "sectionid", sectionId);
        setCourseDetails((prevDetails) => {
          const updatedCourseDetails = { ...prevDetails };
          const sectionIndex = updatedCourseDetails.sections.findIndex(
            (section) => section._id === sectionId
          );

          if (sectionIndex !== -1) {
            const section = { ...updatedCourseDetails.sections[sectionIndex] };
            const videoIndex = section.videoLectures.findIndex(
              (video) => video._id === videoId
            );

            if (videoIndex !== -1) {
              const updatedVideoLectures = [...section.videoLectures];
              updatedVideoLectures[videoIndex] = {
                ...updatedVideoLectures[videoIndex],
                ...updatedVideoDetails,
              };

              // Update the section with the new videoLectures array
              section.videoLectures = updatedVideoLectures;

              // Update the courseDetails with the updated section
              updatedCourseDetails.sections[sectionIndex] = section;
            }
          }

          console.log(updatedCourseDetails);
          // Toast Video Uploaded Successfully
          return updatedCourseDetails;
        });
      } else {
      }
    } catch (error) {
      console.log("error in uploading");
      console.log(error);
    }
  };

  const handleDeleteSectionClick = async (sectionId) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/course/deleteSection/${sectionId}`,
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
          const updatedCourseDetails = { ...prevDetails };
          const updatedSections = updatedCourseDetails.sections.filter(
            (section) => section._id !== sectionId
          );
          updatedCourseDetails.sections = updatedSections;
          // Toast Section Deleted Successfully
          return updatedCourseDetails;
        });
      } else {
      }
    } catch (error) {
      // Handle error
    }
    setShowEditSectionForm(false);
  };

  const handleDeleteCourse = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/course/deleteCourse/${courseDetails._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const data = await res.json();

      if (data.ok) {
        // Toast Deleted Course Successfully
        navigate("/courses");
      } else {
        //
      }
    } catch (error) {
      // Handle error
    }
    setShowEditSectionForm(false);
  };

  useEffect(() => {
    console.log("Edit course form re rendered");
  });

  return (
    <Container>
      <div className="edit-course-container">
        <div className="basic-details">
          {showEditForm ? (
            <EditBasicDetailsForm
              initialDetails={courseDetails}
              onSubmit={handleBasicDetailsSubmit}
              toggleShowEditForm={toggleShowEditForm}
              loading={loading}
              setLoading={setLoading}
            />
          ) : (
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
              <div className="buttons">
                <button onClick={toggleShowEditForm} disabled={loading}>
                  Edit Basic Details
                </button>
                <button
                  onClick={handleDeleteCourse}
                  disabled={loading}
                  className="delete"
                >
                  Delete Course
                </button>
              </div>
            </div>
          )}
        </div>

        <h3>Sections</h3>

        {courseDetails.sections &&
          courseDetails.sections.map((section) => (
            <React.Fragment key={section._id}>
              {showEditSectionForm &&
              selectedSection &&
              selectedSection._id === section._id ? (
                <EditSectionDetailsForm
                  initialSectionDetails={{ ...section }}
                  onSubmit={handleSectionDetailsSubmit}
                  setCourseDetails={setCourseDetails}
                  handleVideoDetailsSubmit={handleVideoDetailsSubmit}
                  toggleShowEditSectionForm={() =>
                    setShowEditSectionForm(false)
                  }
                  loading={loading}
                  setLoading={setLoading}
                />
              ) : (
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
                            <div key={video._id} className="video-item">
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
                            </div>
                          ))}
                        </div>
                      )}
                    {sectionAddVideoState[section._id] && (
                      <AddVideo
                        courseId={courseId}
                        sectionId={section._id}
                        setCourseDetails={setCourseDetails}
                        handleAddVideoClick={handleAddVideoClick}
                        loading={loading}
                        setLoading={setLoading}
                      />
                    )}
                    <button
                      onClick={() => handleAddVideoClick(section._id)}
                      className={
                        sectionAddVideoState[section._id] ? "cancel" : ""
                      }
                    >
                      {sectionAddVideoState[section._id]
                        ? "Cancel Add Video"
                        : "Add Video"}
                    </button>
                    <div className="buttons">
                      <button
                        onClick={() => handleEditSectionClick(section._id)}
                      >
                        Edit Section
                      </button>
                      <button
                        onClick={() => handleDeleteSectionClick(section._id)}
                        className="delete"
                        disabled={loading}
                      >
                        Delete Section
                      </button>
                    </div>
                  </li>
                </ul>
              )}
            </React.Fragment>
          ))}

        {showAddSectionForm && (
          <AddSectionForm
            setCourseDetails={setCourseDetails}
            handleAddSectionClick={handleAddSectionClick}
            loading={loading}
            setLoading={setLoading}
          />
        )}
        <div className="buttons">
          <button
            onClick={handleAddSectionClick}
            disabled={loading}
            className={showAddSectionForm ? "cancel" : ""}
          >
            {showAddSectionForm ? "Cancel Add Section" : "Add Section"}
          </button>
        </div>
        {/* {loading && <div className="loader">Loading...</div>} */}
        {loading && <div className="toaster">Backend call in progress...</div>}
      </div>
    </Container>
  );
};

export default EditCourseForm;

const Container = styled.div`
  width: 100%;
  margin: 0;

  .edit-course-container {
    width: 95%;
    max-width: 1000px;
    margin: 15px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 1401px) {
    .edit-course-container {
      width: 70%;
    }
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
