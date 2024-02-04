import React, { useContext, useEffect } from "react";
import { useState } from "react";
// import '/assets/logo192.png'
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../store/auth-context";

function UploadVideo(props) {
  const navigate = useNavigate();

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

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("video", formData.video);
    form.append("thumbnail", formData.thumbnail);
    console.log(form);

    fetch("http://localhost:8000/video/uploadVideo", {
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
        // navigate(`/teacher/${props.data.id}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      {/* <ImageContainer src="./assets/back_img2.png" alt="Error" />
      <ImageContainer
        src="./assets/back_img1.png"
        style={{ top: "460px", left: "400px", transform: "rotate(-10deg)" }}
        alt="Error"
      /> */}
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
            <Button>Submit</Button>
          </Form>
        </Content>
      </Contain>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  margin: 20px auto;

  .uploadvideo {
    /* background-image: url(); */
  }

  .uploadvideo_form {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 33%;
    padding: 90px 30px;
    margin: 60px auto;
    background-color: rgb(210, 210, 210);
    border: 0;
    border-radius: 10px;
  }

  .uploadvideo_form > label {
    display: flex;
    flex-direction: column;
    font-size: 1.5rem;
    gap: 15px;
    font-weight: bolder;
  }

  .uploadvideo_form > button {
    margin-top: 40px;
    text-align: center;
    height: 2.5rem;
    font-size: 1.5rem;
    background-color: green;
    border: 0;
    border-radius: 10px;
  }

  .uploadvideo_form > label > input {
    height: 2.5rem;
    border: 0;
    border-radius: 10px;
    background-color: white;
    font-size: 1.3rem;
    padding: 0 5px;
  }
`;
const ImageContainer = styled.img`
  position: absolute;
  height: 300px;
  width: 350px;
  top: 130px;
  left: 200px;
  border-radius: 10px;
  transform: rotate(10deg);
  box-shadow: 2px 7px 29px 4px rgba(0, 0, 0, 0.75);
`;
const Contain = styled.div`
  height: 640px;
  width: 460px;
  margin-top: 30px;
  margin-left: 60vw;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  box-shadow: 2px 7px 29px 4px rgba(0, 0, 0, 0.75);
  background-color: white;
`;

const Heading = styled.div`
  height: 10%;
  width: 60%;
  font-size: 40px;
  text-align: center;
  border: 2px solid #131c2c;
  border-radius: 10px;
  background-color: #131c2c;
  color: white;
  letter-spacing: 1px;
`;
const Content = styled.div`
  height: 80%;
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

const Label = styled.label`
  font-size: 25px;
  width: 80%;
  cursor: pointer;
  color: #131c2c;
  font-weight: 700;
  letter-spacing: 1px;
`;

const Input = styled.input`
  height: 50%;
  width: 90%;
  margin-top: 20px;
  cursor: pointer;
  font-size: 20px;
  padding: 5px;
  border-radius: 10px;
  color: #131c2c;
  font-weight: 550;
  letter-spacing: 1px;
`;

const Button = styled.button`
  font-size: 25px;
  height: 50px;
  width: 40%;
  color: white;
  border-radius: 10px;
  background-color: #131c2c;
  cursor: pointer;
`;

const Lognow = styled.div`
  margin-top: 10px;
  height: 10%;
  font-size: 20px;
`;
export default UploadVideo;
