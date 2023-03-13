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
    img: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/signup", {
        email: userData.email,
        username: userData.username,
        password: userData.password,
        isTeacher: userData.isTeacher,
      });
      if (res.status === 200) {
        console.log(res.data);
        navigate("/Random");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ImageContainer src="./assets/back_img2.png" alt="Error" />
      <ImageContainer
        src="./assets/back_img1.png"
        style={{ top: "450px", left: "400px", transform: "rotate(-10deg)" }}
        alt="Error"
      />
      <Container>
        <Heading>Sign Up</Heading>
        <Content>
          <Form onSubmit={handleSubmit}>
            <InputWrapper>
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
                type="text"
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
                onChange={(e) => {
                  setUserData({ ...userData, img: e.target.value });
                }}
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
                }}
              >
                <Input
                  type="radio"
                  name="radio"
                  value="student"
                  style={{ display: "block", fontSize: "20px", height: "10px" }}
                />
                Student
              </Label>
              <Label
                className="container"
                style={{
                  display: "flex",
                  fontSize: "20px",
                  marginLeft: "10px",
                }}
              >
                <Input
                  type="radio"
                  name="radio"
                  value="teacher"
                  style={{ display: "block", fontSize: "40px", height: "10px" }}
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
  left: 200px;
  border-radius: 10px;
  transform: rotate(10deg);
  box-shadow: 2px 7px 29px 4px rgba(0, 0, 0, 0.75);
`;
const Container = styled.div`
  height: 600px;
  width: 460px;
  margin-top: 100px;
  margin-left: 60vw;

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
  height: 40%;
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
`;

const InputWrapper = styled.div`
  height: 25%;
  width: 90%;
  padding: 20px 0px;
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
