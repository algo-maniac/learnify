import React, { useEffect } from "react";
import CreateCourseForm from "../components/CreateCourseForm";
import { useParams } from "react-router-dom";

const Random = () => {
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchVideoDetails = async (id) => {
      const data = await fetch(`http://localhost:8000/video/getVideo/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
    }
    fetchVideoDetails(id);
  });
  return <div>
    <CreateCourseForm />
  </div>;
};

export default Random;
