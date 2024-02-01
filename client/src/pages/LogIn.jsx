import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import './Home.css'
import AuthContext from "../store/auth-context";
import { toast } from "react-toastify";
const LogIn = () => {
  const { userdata, fetchUserdata } = useContext(AuthContext);
  const [currUser, setCurrUser] = useState({
    role: "user",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8000/${ currUser.role }/login`, {
        role: currUser.role,
        email: currUser.email,
        password: currUser.password,
      });
      if (res.status === 404) {
        console.log("User Not Found");
        return;
      }
      if (res.status === 400) {
        console.log("Wrong Password");
        return;
      }
      const { token } = res.data;
      localStorage.setItem('token', token);
      console.log(res);
      fetchUserdata();
      navigate('/', { state: { toast: true, data: res.message } });
    } catch (err) {
      toast.error("Error in Logging", {
        position: 'top-center'
      })
      console.log(err);
    }
  };

  useEffect(() => {
    if(userdata) {
      navigate('/');
    }
  }, [userdata])

  return (
    <Container>
      <Heading>Log In</Heading>
      <Content>
        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <Label htmlFor="role">Role</Label>
            <Select
              name="role"
              id="role"
              value={currUser.role}
              onChange={(e) => {
                setCurrUser({ ...currUser, role: e.target.value });
              }}
            >
              <StyledOption value="user">User</StyledOption>
              <StyledOption value="instructor">Instructor</StyledOption>
              <StyledOption value="admin">Admin</StyledOption>
            </Select>
          </InputWrapper>

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
              type="password"
              name="password"
              id="password"
              value={currUser.password}
              onChange={(e) => {
                setCurrUser({ ...currUser, password: e.target.value });
              }}
            />
          </InputWrapper>

          <Button className="login-submit">Submit</Button>
          <Signnow>
            Don't have an account?
            <NavLink to="/SignUp"> Sign Up</NavLink>
          </Signnow>
        </Form>
      </Content>
    </Container>
  );
};

const Container = styled.div`
max-width: 600px;
min-height: calc(100vh - 130px);
display: flex;
flex-direction: column;
/* justify-content: center; */
justify-content: space-evenly;
align-items: center;
margin: 30px auto 30px auto;
border-radius: 10px;
box-shadow: 1px 1px 4px #ccc;
background-color: #fff;
`;

const Select = styled.select`
width: 100%;
padding: 10px;
border: 1px solid #ccc;
border-radius: 5px;
font-size: 16px;
margin-bottom: 15px;
`;

const StyledOption = styled.option`
color: #1732ac;
background-color: white;
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
padding: 5px;
border-radius: 5px;
border: 1px solid #ccc;
`;

const Label = styled.label`
font-size: 18px;
font-weight: 700;
letter-spacing: 1px;
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

&hover {
    background-color: #3c56cd;
  }
`;

const Signnow = styled.div`
margin-top: 10px;
a {
  text-decoration: none;
  color: #383fa0
}
`;

export default LogIn;