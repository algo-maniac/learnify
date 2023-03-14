import React, { useEffect } from "react";
import "./UploadVideo.css";
import { useState } from "react";
// import '/assets/logo192.png'
import { Navigate, useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import styled from "styled-components";

function UploadVideo(props) {
  const navigate = useNavigate();
  // console.log(props.userData);
  // props mein data tik nhi raha hai toh jwt ke baad shayad karega
  // email se search karunga mein
  const email = "abc@gmail.com";
  // fake user defined email is used after jwt actual data will be used
  const [teacherInfo, setInfo] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    videoUrl: "",
    userID: "",
  });
  const [file, setFile] = useState("");
  const imgHandler = (env) => {
    setFile(env.target.files[0]);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("image", file);
    form.append("title", formData.title);
    form.append("videourl", formData.videoUrl);
    form.append("email", email);
    fetch("http://localhost:8000/teacher", {
      method: "POST",
      body: form,
    })
      .then((data) => {
        return data.json();
      })
      .then((result) => {
        alert(result.msg);
        // navigate karna hai waha kar dena
        navigate(`teacher/${props.username.substring(0, 5)}`);
      })
      .catch((er) => {});
  };
  return (
    <>
      <ImageContainer src="./assets/back_img2.png" alt="Error" />
      <ImageContainer
        src="./assets/back_img1.png"
        style={{ top: "460px", left: "400px", transform: "rotate(-10deg)" }}
        alt="Error"
      />
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
            <Label htmlFor="videoUrl" name="videoUrl">
              VideoUrl:
              <Input
                type="url"
                name="videoUrl"
                id="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
              />
            </Label>
            <Label htmlFor="thumbnail" name="thumbnail">
              Thumbnail:
              <Input
                type="file"
                name="thumbnail"
                id="thumbnail"
                value={formData.thumbnail}
                onChange={imgHandler}
              />
            </Label>
            <Button>Submit</Button>
          </Form>
        </Content>
      </Contain>
    </>
  );
}

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
