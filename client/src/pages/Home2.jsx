

import PersonIcon from '@mui/icons-material/Person';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import InfoIcon from '@mui/icons-material/Info';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';

function Home() {
    const location = useLocation();
    const [state,setState]=useState(location.state)
    useEffect(()=>{
        if(state){
            if(state?.toast){
                toast.success(state?.data,{
                    position:'top-center'
                })
            }
            setState(null)
        }
    },[state])
    return (
        <>
        {/* <ToastContainer/> */}
            <Container>
                <div className="image-container">
                    <img src='/home_background_2.jpeg' alt='background image'/>
                    <div className="text-overlay">
                        <h3>Discover, Learn, and Elevate Your Potential</h3>
                    </div>
                </div>
                
            </Container>
        </>
    )
}

export default Home

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;

  .image-container {
    width: 100%;
    aspect-ratio: 4;
    overflow: hidden;
    position: relative;

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
/*
  .text-overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      h3 {
        color: #131313;
        font-size: 3rem;
        font-weight: 700;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8); 
        text-shadow: 6px 6px 6px #fcfcfccc; 
        background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2));
        padding: 20px;
        border-radius: 8px;
      }
    }
    */

    .text-overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        h3 {
            color: #2f2fb1; /* Dark Gray */
            font-size: 3rem;
            font-weight: 700;
            text-shadow: 2px 2px 4px rgba(255, 254, 254, 0.8); /* White */
            padding: 20px;
            border-radius: 8px;
            /* background: linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.3)); White gradient */
        }
    }
`;