import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import './Home.css'
import AuthContext from "../store/auth-context";
import Modal from '@mui/material/Modal'; 
import Box from '@mui/material/Box';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
const SignUp = () => {
  const { fetchUserdata } = useContext(AuthContext);
  const [popup,setPopup]=useState(false);
  const [loader,setLoader]=useState(false);
  const [timeout,setTimeout]=useState(5);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profileImage: null,
    role: 'user',
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'profileImage' ? files[0] : value,
    }));
  };
  const redirectHandler=()=>{
    navigate("/")
  }
  const redirectToLogin=()=>{
    navigate("/login")
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    toast("Signing up... Please wait ",{
      position:'top-center'
    });
    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('profileImage', formData.profileImage);
    formDataToSend.append('role', formData.role);

    try {
      const data = await fetch(`http://localhost:8000/${formData.role}/signup`, {
        method: "POST",
        body: formDataToSend,
      });
      setLoader(false);
      const res = await data.json();
      const token = res.token;
      localStorage.setItem('token', token);
      fetchUserdata();
      if(res.message==="Sucessfully registered. Awaiting approval"){
        setInterval(() => {
          setTimeout((prev)=>{
            if(prev===0){
              navigate("/")
            }
            else{
              return prev-1;
            }
          })
        }, 1000);
        setPopup(true)
      }
    } catch (err) {
      console.log(err);
      setLoader(true);
      toast.error("Signup Failed, Try Again",{
        position:'top-center'
      })
    }
  };

  return (
    <>
    {loader && <ToastContainer />}
      {popup && <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="popup-box">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className="header">
              <div className="icon"><ErrorOutlineIcon/></div>
              <div className="text"><h3>Approval Pending</h3></div>
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="content">
              <p>Successfully Registered, Awaiting Approval</p>
              <div className="redirect">
                <div className="content-box">
                  <p>Redirecting to Home Page in {timeout}...</p>
                </div>
                <div className="content-box">
                  <button className="button-70" onClick={redirectHandler}>Home</button>
                  <button className="button-70" onClick={redirectToLogin}>Login</button>
                </div>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>}
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
          <InputWrapper>
              <Label htmlFor="role">Role</Label>
              <Select
                name="role"
                id="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="user">User</option>
                <option value="instructor">Instructor</option>
                <option value="admin">Admin</option>
              </Select>
            </InputWrapper>

            <InputWrapper style={{ marginTop: "10px" }}>
              <Label>
                Username:
                <Input type="text" name="username" value={formData.username} onChange={handleInputChange} />
              </Label>
            </InputWrapper>

            <InputWrapper>
              <Label>
                Email:
                <Input type="email" name="email" value={formData.email} onChange={handleInputChange} />
              </Label>
            </InputWrapper>

            <InputWrapper>
              <Label>
                Password:
                <Input type="password" name="password" value={formData.password} onChange={handleInputChange} />
              </Label>
            </InputWrapper>

            <InputWrapper>
              <Label>
                Profile Image:
                <Input type="file" name="profileImage" accept="image/*" onChange={handleInputChange} />
              </Label>
            </InputWrapper>
            <Button className="signup-submit">Submit</Button>
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

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 15px;
`;


const Container = styled.div`
  height: 670px;
  width: 540px;
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
  background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
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
  height: 55%;
  width: 90%;
  margin-top: 5px;
  font-size: 20px;
  padding: 5px;
  border-radius: 5px;
  color: #131c2c;
  font-weight: 550;
  letter-spacing: 1px;
`;

const Label = styled.label`
  font-size: 25px;
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
