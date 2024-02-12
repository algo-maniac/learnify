import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
const SignUp = () => {
  const { userdata, fetchUserdata } = useContext(AuthContext);
  const [popup, setPopup] = useState(false);
  const [loader, setLoader] = useState(false);
  const [timeout, setTimeout] = useState(5);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profileImage: null,
    role: "user",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "profileImage" ? files[0] : value,
    }));
  };
  const redirectHandler = () => {
    navigate("/");
  };
  const redirectToLogin = () => {
    navigate("/login");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    toast("Signing up... Please wait ", {
      position: "top-center",
    });
    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("profileImage", formData.profileImage);
    formDataToSend.append("role", formData.role);

    try {
      const data = await fetch(
        `http://localhost:8000/${formData.role}/signup`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );
      const res = await data.json();
      const token = res.token;
      localStorage.setItem("token", token);
      fetchUserdata();
      setLoader(false);
      if (res.message === "Sucessfully registered. Awaiting approval") {
        setInterval(() => {
          setTimeout((prev) => {
            if (prev === 0) {
              navigate("/");
            } else {
              return prev - 1;
            }
          });
        }, 1000);
        setPopup(true);
      }
    } catch (err) {
      console.log(err);
      setLoader(true);
      toast.error("Signup Failed, Try Again", {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    if (userdata) {
      navigate("/");
    }
  }, [userdata]);

  return (
    <>
      {loader && <ToastContainer />}
      {popup && (
        <Modal
          open={true}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="popup-box">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <div className="header">
                <div className="icon">
                  <ErrorOutlineIcon />
                </div>
                <div className="text">
                  <h3>Approval Pending</h3>
                </div>
              </div>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className="content">
                <div>
                  <p>Successfully Registered, Awaiting Approval</p>
                </div>
                <div className="redirect">
                  <div className="content-box">
                    <p>Redirecting to Home Page in {timeout}...</p>
                  </div>
                  <div className="content-box">
                    <button className="button-70" onClick={redirectHandler}>
                      Home
                    </button>
                    <button className="button-70" onClick={redirectToLogin}>
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </Typography>
          </Box>
        </Modal>
      )}

      <Container>
        <Heading>Sign Up</Heading>
        <Content>
          <Form onSubmit={handleSubmit}>
            <InputWrapper>
              <Label htmlFor="role">Role</Label>
              <CustomSelect>
                <StyledSelect
                  name="role"
                  id="role"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <StyledOption value="user">User</StyledOption>
                  <StyledOption value="instructor">Instructor</StyledOption>
                  <StyledOption value="admin">Admin</StyledOption>
                </StyledSelect>
              </CustomSelect>
            </InputWrapper>

            <InputWrapper>
              <Label>
                Username:
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </Label>
            </InputWrapper>

            <InputWrapper>
              <Label>
                Email:
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Label>
            </InputWrapper>

            <InputWrapper>
              <Label>
                Password:
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </Label>
            </InputWrapper>

            <InputWrapper>
              <Label>
                Profile Image:
                <Input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  onChange={handleInputChange}
                />
              </Label>
            </InputWrapper>
            <br />
            <Button className="signup-submit">Submit</Button>
            <Lognow>
              Already Logged In?
              <NavLink to="/LogIn"> Log In</NavLink>
            </Lognow>
          </Form>
        </Content>
      </Container>
    </>
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

const CustomSelect = styled.div`
  position: relative;
  width: 100%;
`;

const StyledSelect = styled.select`
  appearance: none;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  /* color: #1732ac; */
  background-color: white;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover,
  &:focus {
    border-color: #1732ac;
    box-shadow: 0 0 5px rgba(23, 50, 172, 0.5);
  }
`;
const StyledOption = styled.option`
  /* Styling options is limited, but you can apply some styles */
  color: #1732ac;
  background-color: white;
`;

const Heading = styled.div`
  /* height: 13%; */
  /* width: 60%; */
  font-size: 28px;
  text-align: center;
  /* border: 2px solid #131c2c; */
  border-radius: 10px;
  /* background-color: #3a62f5; */
  /* color: white; */
  color: black;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Content = styled.div`
  /* height: 80%; */
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

  /* color: #131c2c; */
`;

const Label = styled.label`
  font-size: 18px;
  /* color: #131c2c; */
  font-weight: 700;
  letter-spacing: 1px;
  width: 100%;
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
`;

const Lognow = styled.div`
  margin-top: 10px;
  height: 10%;
  /* font-size: 20px; */

  a {
    text-decoration: none;
    color: #383fa0;
  }
`;

export default SignUp;
