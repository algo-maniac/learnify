import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import AuthContext from "../store/auth-context";
import { Link, useLocation } from "react-router-dom";

const LeftMenu = ({ isSidebarExpanded, pageId, setIsSidebarExpanded }) => {
  const { userdata } = useContext(AuthContext);

  const menuItems = {
    user: [
      { link: "/course", icon: "/assets/course.png", text: "Courses" },
      { link: "/video", icon: "/assets/video.png", text: "Videos" },
      {
        link: "/instructor",
        icon: "/assets/instructor.png",
        text: "Instructors",
      },
      {
        link: "/purchased-course",
        icon: "/assets/purchase.png",
        text: "Purchases",
      },
      {
        link: "/enrolled-courses",
        icon: "/assets/enrolled.png",
        text: "Enrolled",
      },
      {
        link: "/dashboard-user",
        icon: "/assets/dashboard.png",
        text: "DashBoard",
      },
    ],
    instructor: [
      { link: "/course", icon: "/assets/course.png", text: "Courses" },
      { link: "/video", icon: "/assets/video.png", text: "Videos" },
      {
        link: "/instructor",
        icon: "/assets/instructor.png",
        text: "Instructors",
      },
      {
        link: "/purchased-course",
        icon: "/assets/purchase.png",
        text: "Purchases",
      },
      {
        link: "/enrolled-course",
        icon: "/assets/enrolled.png",
        text: "Enrolled",
      },
      {
        link: "/edit-course",
        icon: "/assets/edit-course.png",
        text: "Edit Courses",
      },
      {
        link: "/edit-video",
        icon: "/assets/edit-video.png",
        text: "Edit Videos",
      },
      {
        link: "/dashboard-instructor",
        icon: "/assets/dashboard.png",
        text: "DashBoard",
      },
    ],
    admin: [
      { link: "/course", icon: "/assets/course.png", text: "Courses" },
      { link: "/video", icon: "/assets/video.png", text: "Videos" },
      {
        link: "/instructor",
        icon: "/assets/instructor.png",
        text: "Instructors",
      },
      {
        link: "/dashboard-admin",
        icon: "/assets/dashboard.png",
        text: "DashBoard",
      },
    ],
  };

  const location = useLocation();
  // console.log(location);

  return (
    <Container className={`${isSidebarExpanded ? "" : "collapsed"}`}>
      <div className="middle">
        <div className="main-features">
          {(userdata && menuItems[userdata.role]
            ? menuItems[userdata.role]
            : menuItems["user"]
          ).map((item, index) => (
            <Link
              key={index}
              to={item.link}
              // className={`full-width-link ${ pageId == item.link ? 'selected' : '' } ${ isSidebarExpanded ? '' : 'collapsed' }`}
              className={`full-width-link ${
                location.pathname.startsWith(item.link) ? "selected" : ""
              } ${isSidebarExpanded ? "" : "collapsed"}`}
              onClick={() =>
                window.innerWidth <= 786 && setIsSidebarExpanded(false)
              }
            >
              <img
                src={item.icon}
                alt="hello"
                style={{ width: "30px", height: "30px" }}
              />
              <p>{item.text}</p>
            </Link>
          ))}
        </div>
        {/* <div className="events">
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
        </div> */}
      </div>
      <div className={`bottom ${isSidebarExpanded ? "" : "collapsed"}`}>
        Product developed & maintained by <a href="/">Learnify Business</a>
      </div>
    </Container>
  );
};

export default LeftMenu;

const Container = styled.div`
  height: calc(100vh - 70px);
  width: 260px;
  z-index: 11;
  position: fixed;
  top: 70px;
  left: 0;

  background-color: #ffffff;
  /* background-color: whitesmoke; */
  /* background-color: #dcdbdb; */
  border-right: 1px solid #d0d0d0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px;

  svg {
    font-size: 1.75rem;
  }

  .middle {
    .main-features {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 50px 0 20px 0;
      border-bottom: 1px solid #b4aeae;
    }

    .events {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px 0;
      border-bottom: 1px solid #b4aeae;
    }

    .socials {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px 0;
    }

    .full-width-link {
      /* width: 220px; */
      width: 100%;
      background-color: #f0f0f0;
      /* background-color: #ffffff; */
      height: 40px;
      display: flex;
      margin: 0;
      justify-content: flex-start;
      align-items: center;
      place-items: center;
      padding: 10px 30px;
      margin: 5px 0;
      border-radius: 100px;
      overflow: hidden;

      /* border: 1px solid #000; */
      /* box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 10px 0px; */
      /* background-color: rgba(229, 229, 229, 0.5); */
      text-decoration: none;
      font-weight: 400;

      p {
        font-size: 0.75rem;
        margin: 0;
        margin-left: 10px;
        text-transform: uppercase;
        letter-spacing: 0.08rem;
        color: black;
        font-weight: 400;
      }

      svg {
        font-size: 1.5rem;
        color: black;
      }

      &.collapsed {
        padding: 10px 10px;

        p {
          display: none;
        }
      }

      &.selected {
        box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 10px 0px;
        background-color: #e5e5e5;
        /* border: 1px solid black; */
        transition-duration: 250ms;
        cursor: pointer;
        background-color: #cfdbf9;
      }

      &:hover {
        box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 10px 0px;
        background-color: #e5e5e5;
        /* border: 1px solid black; */
        transition-duration: 250ms;
        cursor: pointer;
        background-color: #bfcff6;
      }
    }
  }

  .bottom {
    text-align: center;
    font-size: 0.65rem;
    a {
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
`;
