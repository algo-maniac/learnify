import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const TopNavbar = () => {
  return (
    <Container>
      <div className="left">
        <div className="course-name">
          <div className="text">Cloud Course Free</div>
          <ExpandMoreIcon/>
        </div>
      </div>
      <div className="right">
        <div className="text">
          <div className="top-text">@NayakPenguin - </div>
          <div className="bottom-text">Atanu Nayak</div>
        </div>
        <div className="avatar"><img src="https://avatars.githubusercontent.com/u/93304796?v=4" alt="" /></div>
      </div>
    </Container>
  )
}

export default TopNavbar

const Container = styled.div`
    height: 60px;
    width: calc(100vw - 260px);
    z-index: 10;
    
    position: fixed;
    top: 0;
    right: 0;

    background-color: #fff;
    border-bottom: 1px solid #d0d0d0;
    /* border-left: 1px solid #d0d0d0; */

    padding: 10px 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .left{
      display: flex;
      align-items: center;
      
      .course-name{
        display: flex;
        align-items: center;

        background-color: #f3f3f3;
        border: 1px solid #e3e3e3;
        border-radius: 10px;

        padding: 10px;

        .text{
          font-size: 0.75rem;
          font-weight: 500;
        }

        svg{
          font-size: 1rem;
        }
      }
    }

    .right{
      display: flex;
      align-items: center;

      .text{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;

        .top-text{
          font-size: 0.75rem;
          font-weight: 500;
          color: cornflowerblue;
          margin-right: 5px;
          font-style: italic; 
          letter-spacing: 0.05rem;
        }

        .bottom-text{
          font-size: 0.85rem;
          font-weight: 500;
          /* text-transform: uppercase; */
          /* letter-spacing: 0.1rem; */
        }
      }
      
      .avatar{
        height: 40px;
        aspect-ratio: 1/1;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid #c1c1c1;

        display: flex;
        align-items: center;

        img{
          width: 100%;
        }
      }
    }

`