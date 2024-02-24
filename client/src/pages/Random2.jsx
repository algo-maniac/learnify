import React, { useEffect } from "react";
import CreateCourseForm from "./CreateCourseForm";
import { useParams } from "react-router-dom";

const Random = () => {
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchVideoDetails = async (id) => {
      const data = await fetch(`${process.env.REACT_APP_BASE_URL}/video/getVideo/${id}`, {
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
