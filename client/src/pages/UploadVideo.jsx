import React, { useContext, useEffect } from "react";
import { useState } from "react";
// import '/assets/logo192.png'
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../store/auth-context";

function UploadVideo(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video: null,
    thumbnail: null,
  });
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVideoChange = (e) => {
    setFormData({ ...formData, video: e.target.files[0] });
  };

  const handleThumbnailChange = (e) => {
    setFormData({ ...formData, thumbnail: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
    setLoading(true);
    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("video", formData.video);
    form.append("thumbnail", formData.thumbnail);
    console.log(form);

    fetch(`${process.env.REACT_APP_BASE_URL}/video/uploadVideo`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: form,
    })
      .then((data) => data.json())
      .then((result) => {
        console.log(result);

        // Upload Video
        navigate(`/video`);
      })
      .catch((err) => {
        console.error(err);
      });
    } catch(err) {
      console.log(err);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <>
      <Contain>
        <Heading>Upload Video</Heading>
        <Content>
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="title" name="title">
              Title:
              <Input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Label>
            <Label htmlFor="description" name="description">
              Description:
              <Input
                type="text"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Label>
            <Label htmlFor="video">
              Video File:
              <Input
                type="file"
                name="video"
                id="video"
                onChange={handleVideoChange}
              />
            </Label>
            <Label htmlFor="thumbnail" name="thumbnail">
              Thumbnail:
              <Input
                type="file"
                name="thumbnail"
                id="thumbnail"
                onChange={handleThumbnailChange}
              />
            </Label>
            <br />
            <br />
            <Button disabled={loading}>Submit</Button>
          </Form>
        </Content>
        {loading && <div className="toaster">Backend call in progress...</div>}

      </Contain>
    </>
  );
}

const Contain = styled.div`
  max-width: 600px;
  min-height: calc(100vh - 130px);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin: 30px auto 30px auto;
  border-radius: 10px;
  box-shadow: 1px 1px 4px #ccc;
  background-color: #fff;

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

const Heading = styled.div`
  font-size: 28px;
  text-align: center;
  color: black;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Content = styled.div`
  width: 90%;
`;

const Form = styled.form`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Input = styled.input`
  height: 40px;
  width: 100%;
  margin-top: 5px;
  font-size: 16px;
  padding: 8px; /* Increased padding for better aesthetics */
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Label = styled.label`
  width: 100%;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 5px; /* Added margin for better separation */
`;

const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const Button = styled.button`
  height: 40px;
  width: 100%;
  color: white;
  border-radius: 5px;
  background-color: #1732ac;
  border: none;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #3c56cd;
    color: white;
  }

  &:disabled {
    background-color: #586fd6 !important;
    color: #e5e5e5 !important;
    cursor: not-allowed !important;
  }
`;

const Lognow = styled.div`
  margin-top: 10px;
  
  a {
    text-decoration: none;
    color: #383fa0;
  }
`;

export default UploadVideo;
