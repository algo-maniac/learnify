import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    isTeacher: 0,
  });
  const [file, setFile] = useState("");
  const imgHandler = (env) => {
    setFile(env.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", userData.email);
    formData.append("username", userData.username);
    formData.append("password", userData.password);
    formData.append("isTeacher", userData.isTeacher);
    formData.append("image", file);
    console.log(formData)
      fetch("http://localhost:8000/signup", {
        method: "POST",
        body: formData,
      }).then((data)=>{
        return data.json();
      }).then((result)=>{
        console.log(result);
      }).catch((er)=>{
        console.log(er);
      });
      // if (res.status === 200) {
      //   console.log(res);
      //   navigate("/home");
      // }
  };

  return (
    <>
      <ImageContainer src="./assets/back_img2.png" alt="Error" />
      <ImageContainer
        src="./assets/back_img1.png"
        style={{ top: "460px", left: "400px", transform: "rotate(-10deg)" }}
        alt="Error"
      />
      <Container>
        <Heading>Sign Up</Heading>
        <Content>
          <Form onSubmit={handleSubmit}>
            <InputWrapper style={{ marginTop: "10px" }}>
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                value={userData.username}
                onChange={(e) => {
                  setUserData({ ...userData, username: e.target.value });
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="email">Email</Label>
              <Input
                type="text"
                name="email"
                id="email"
                value={userData.email}
                onChange={(e) => {
                  setUserData({ ...userData, email: e.target.value });
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={userData.password}
                onChange={(e) => {
                  setUserData({ ...userData, password: e.target.value });
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="username">Image</Label>
              <Input
                type="file"
                name="img"
                id="imf"
                value={userData.img}
                onChange={imgHandler}
              />
            </InputWrapper>
            <InputWrapper
              onChange={(e) => {
                if (e.target.value === "teacher") {
                  setUserData({ ...userData, isTeacher: 1 });
                } else {
                  setUserData({ ...userData, isTeacher: 0 });
                }
              }}
              style={{
                display: "flex",
                fontSize: "10px",
                height: "20px",
                margin: "5px 0px",
              }}
            >
              <Label
                className="container"
                style={{
                  display: "flex",
                  fontSize: "20px",
                  height: "20px",
                }}
              >
                <Input
                  type="radio"
                  name="radio"
                  value="student"
                  style={{
                    display: "block",
                    fontSize: "20px",
                    height: "10px",
                    width: "30px",
                  }}
                />
                Student
              </Label>
              <Label
                className="container"
                style={{
                  display: "flex",
                  fontSize: "20px",
                  marginLeft: "10px",
                  height: "20px",
                }}
              >
                <Input
                  type="radio"
                  name="radio"
                  value="teacher"
                  style={{
                    display: "block",
                    fontSize: "40px",
                    height: "10px",
                    width: "30px",
                  }}
                />
                Teacher
              </Label>
            </InputWrapper>
            <Button>Submit</Button>
            <Lognow>
              <NavLink to="/LogIn">Already Logged In? Log In</NavLink>
            </Lognow>
          </Form>
        </Content>
      </Container>
    </>
  );
};

const ImageContainer = styled.img`
  position: absolute;
  height: 300px;
  width: 350px;
  top: 130px;
  left: 200px;
  border-radius: 10px;
  transform: rotate(10deg);
  box-shadow: 2px 7px 29px 4px rgba(0, 0, 0, 0.75);
  z-index: -1;
`;
const Container = styled.div`
  // z-index: 10;
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
`;
const Content = styled.div`
  // z-index: 10;
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
const Input = styled.input`
  height: 30%;
  width: 90%;
  margin-top: 5px;
  cursor: pointer;
  font-size: 20px;
  padding: 5px;
  border-radius: 10px;
  color: #131c2c;
  font-weight: 550;
  letter-spacing: 1px;
`;

const Label = styled.label`
  font-size: 25px;
  cursor: pointer;
  color: #131c2c;
  font-weight: 700;
  letter-spacing: 1px;
  border: none;
`;

const InputWrapper = styled.div`
  height: 20%;
  width: 90%;
  padding: 15px 0px;
`;

const Button = styled.button`
  font-size: 25px;
  height: 15%;
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
export default SignUp;
