import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';
import GitHubIcon from '@material-ui/icons/GitHub';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import VideocamIcon from '@material-ui/icons/Videocam';
import AssignmentIcon from '@material-ui/icons/Assignment';
import EventIcon from '@material-ui/icons/Event';
import ForumIcon from '@material-ui/icons/Forum';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import AuthContext from '../store/auth-context';

const LeftMenu = ( { isSidebarExpanded, pageId }) => {
  const { userdata } = useContext(AuthContext);
  // const menuItems = [
  //   { link: '/course-structure', icon: <TrendingUpIcon />, text: "Course Structure" },
  //   // { link: '/lecture', icon: <VideocamIcon />, text: "Course Lectures" },
  //   { link: '/course-lectures', icon: <VideocamIcon />, text: "Course Lectures" },
  //   { link: '/leaderboard', icon: <WhatshotIcon />, text: "Leaderboard" },
  //   // { link: '/learning-resources', icon: <LocalOfferIcon />, text: "Resources" },
  //   { link: '/assignments', icon: <AssignmentIcon />, text: "Assignments" },
  // ];

  const menuItems = {
    user: [
      { link: '/courses', icon: <AssignmentIcon />, text: "Courses" },
      { link: '/instructor', icon: <AssignmentIcon />, text: "Instructors" },
      { link: '/purchased-courses', icon: <AssignmentIcon />, text: "Purchased" },
      { link: '/enrolled-courses', icon: <AssignmentIcon />, text: "Enrolled" },
    ], 
    instructor: [
      { link: '/courses', icon: <AssignmentIcon />, text: "Courses" },
      { link: '/instructor', icon: <AssignmentIcon />, text: "Instructors" },
      { link: '/purchased-courses', icon: <AssignmentIcon />, text: "Purchased" },
      { link: '/enrolled-courses', icon: <AssignmentIcon />, text: "Enrolled" },
    ],
    admin: [
      { link: '/courses', icon: <AssignmentIcon />, text: "Courses" },
      { link: '/instructor', icon: <AssignmentIcon />, text: "Instructors" },
      { link: '/purchased-courses', icon: <AssignmentIcon />, text: "Purchased" },
      { link: '/enrolled-courses', icon: <AssignmentIcon />, text: "Enrolled" },
    ]
  }




  return (
    <Container className={`${ isSidebarExpanded ? '' : 'collapsed' }`}>
      <div className="middle">
        <div className="main-features">
          {userdata && menuItems[userdata.role].map((item, index) => (
            <a
              key={index}
              href={item.link}
              className={`full-width-link ${ pageId == item.link ? 'selected' : '' } ${ isSidebarExpanded ? '' : 'collapsed' }`}
            >
              {item.icon} <p>{item.text}</p>
            </a>
          ))}
        </div>
        <div className="events">
          <a
            href="/upcoming-events"
            className={`full-width-link ${ pageId == "/upcoming-events" ? 'selected' : '' } ${ isSidebarExpanded ? '' : 'collapsed' }`}
          >
            <EventIcon /> <p>Upcoming Events</p>
          </a>
        </div>
        <div className="socials">
          <a href='https://github.com/topics/cloud-computing' target='_blank' className={`full-width-link ${ isSidebarExpanded ? '' : 'collapsed' }`}><GitHubIcon /><p>Related Projects</p></a>
          <a href='https://app.slack.com/client/TJTJJ6R1A/CJTJJ6XN0' target='_blank' className={`full-width-link ${ isSidebarExpanded ? '' : 'collapsed' }`}>
            <ForumIcon />
            <p>Discussion Forum</p>
          </a>
        </div>
      </div>
      <div className={`bottom ${ isSidebarExpanded ? '' : 'collapsed' }`}>
        Product developed & maintained by <a href='/'>Learnify Business</a>
      </div>
    </Container>
  )
}

export default LeftMenu

const Container = styled.div`
    height: calc(100vh - 70px);
    width: 260px;
    z-index: 11;
    position: fixed;
    top: 70px;
    left: 0;

    background-color: #ffffff;
    /* background-color: whitesmoke; */
    /* background-color: #c2c2c2; */
    border-right: 1px solid #d0d0d0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px 10px;

    svg{
      font-size: 1.75rem;
    }

    .middle{
      .main-features{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 50px 0 20px 0;
        border-bottom: 1px solid #b4aeae;
      }
  
      .events{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px 0;
        border-bottom: 1px solid #b4aeae;
      }
  
      .socials{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px 0;
      }  

      .full-width-link{
        /* width: 220px; */
        width: 100%;
        background-color: whitesmoke;
        background-color: #ffffff;
        height: 40px;
        display: flex;
        /* justify-content: center; */
        justify-content: flex-start;
        place-items: center;
        padding: 0 15px;
        margin: 5px 0; 
        border-radius: 100px;
        overflow: hidden;

        /* border: 1px solid #000; */
        /* box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 10px 0px; */
        /* background-color: rgba(229, 229, 229, 0.5); */
        text-decoration: none;
        font-weight: 400;

        p{
          font-size: 0.75rem;
          margin-left: 10px;
          text-transform: uppercase;
          letter-spacing: 0.08rem;
          color: black;
          font-weight: 400;
        }

        svg{
          font-size: 1.5rem;
          color: black;
        }
  
        &:hover{
          box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 10px 0px;
          background-color: #e5e5e5;
          /* border: 1px solid black; */
          transition-duration: 250ms;
          cursor: pointer;
          background-color: #a6c1ff;
        }

        &.collapsed {
          p {
            display: none;
          }
        }
      }
      
    }

    .bottom{
      text-align: center;
      font-size: 0.65rem;
      a{
        display: block;
        font-weight: 500;
        font-size: 0.85rem;
      }

      &.collapsed {
        display: none;
      }
    }

    &.collapsed {
      justify-content: flex-start;
      width: 65px;
    }
  
`