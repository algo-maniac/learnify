import React, { useState } from "react";
import styled from "styled-components";
import { NavLink, useInRouterContext, useNavigate } from "react-router-dom";
import axios from "axios";

const LogIn = ({ userData, setUserData }) => {
  const [currUser, setCurrUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/login", {
        email: currUser.email,
        password: currUser.password,
      });
      if (res.status === 404) {
        console.log("User Not Found");
      } else if (res.status === 400) {
        console.log("Wrong Password");
      } else {
        console.log("Logged In");
        const { _id, username, email, isTeacher } = res.data;
        await setUserData({
          username,
          email,
          isLogged: true,
          isTeacher,
          id: _id,
        });
        console.log(userData);
        navigate("/teachers");
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
        style={{ top: "460px", left: "400px", transform: "rotate(-10deg)" }}
        alt="Error"
      />
      <Container>
        <Heading>Log In</Heading>
        <Content>
          <Form onSubmit={handleSubmit}>
            <InputWrapper>
              <Label htmlFor="email">Email</Label>
              <Input
                type="text"
                name="email"
                id="email"
                value={currUser.email}
                onChange={(e) => {
                  setCurrUser({ ...currUser, email: e.target.value });
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="password">Password</Label>
              <Input
                type="text"
                name="password"
                id="password"
                value={currUser.password}
                onChange={(e) => {
                  setCurrUser({ ...currUser, password: e.target.value });
                }}
              />
            </InputWrapper>
            <Button>Submit</Button>
            <Signnow>
              <NavLink to="/SignUp">Not Signed Up? Sign Up</NavLink>
            </Signnow>
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
`;
const Container = styled.div`
  height: 500px;
  width: 460px;
  margin-top: 100px;
  margin-left: 60vw;
  //   border: 1px solid black;
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
  //   border: 2px solid red;
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
  //   border: 2px solid red;
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
  height: 20%;
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

const Signnow = styled.div`
  height: 10%;
  font-size: 20px;
`;
export default LogIn;
