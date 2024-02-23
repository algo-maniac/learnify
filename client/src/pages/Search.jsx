import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import VideoCard from "../components/VideoCard";
import TeacherCard from "../components/TeacherCard";
import { CardActionArea } from "@mui/material";
import Fab from "@mui/material/Fab";
import { useContext, useEffect, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { Provider, useDispatch, useSelector } from "react-redux";
import { setSearch } from "../store/searchSlice";

const Search = () => {
  const location = useLocation();
  const { isSidebarExpanded } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [videos, setVideos] = useState([]);

  const searchValue = useSelector((state) => state.search.searchValue);
  const fetchHandler = async () => {
    console.log(searchValue);
    if (searchValue !== "") {
      const res = await fetch("/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ query: searchValue }),
      });
      const data = await res.json();
      setCourses(data.courses);
      setUsers(data.instructor);
      setVideos(data.videos);
      console.log(data);
    }
  };
  const filterDesc = (text) => {
    return text.slice(0, 100);
  };
  const toMin = (val) => {
    var duration = "";
    var min = parseInt(val);
    if (min) {
      duration += min + " m";
    } else {
      duration += "1 m";
    }
    return duration;
  };
  useEffect(() => {
    fetchHandler();
  }, [searchValue]);

  return (
    <Container>
      <div className="video-box">
        <div className="header1">
          <h5>Instructors</h5>
        </div>
        <div className="teachers">
          <div
            className={`teachercards  ${ isSidebarExpanded ? "sidebarExpanded" : ""
              }`}
          >
            {users &&
              users.map((instructor) => (
                <TeacherCard
                  key={instructor._id}
                  id={instructor._id}
                  username={instructor.username}
                  profileImage={instructor.profileImage}
                  socialMediaLinks={instructor.socialMediaLinks}
                />
              ))}
          </div>
        </div>
        {users.length === 0 && <p>No Instructor Found</p>}
      </div>
      <br />
      <div className="video-box">
        <div className="header1">
          <h5>Videos</h5>
        </div>
        <div className="video-list">
          <div
            className={`videos ${ isSidebarExpanded ? "sidebarExpanded" : "" }`}
          >
            {videos &&
              videos.map((vid) => {
                return (
                  <div className="video">
                    <VideoCard
                      key={vid._id}
                      id={vid._id}
                      title={vid.title}
                      description={vid.description}
                      duration={toMin(vid.duration)}
                      thumbnail={vid.thumbnail}
                    // profileImage={profileImage}
                    />
                  </div>
                );
              })}
          </div>
          {videos.length === 0 && <p>No Videos Found</p>}
          {/* {videos.length === 0 && (
              <img
                src="https://cdn.vectorstock.com/i/preview-1x/04/93/no-data-empty-concept-vector-41830493.jpg"
                className="not-found-image"
              ></img>
            )} */}
        </div>
      </div>
      <br />
      <br />
      <div className="video-box">
        <div className="header1">
          <h5>Courses</h5>
        </div>
        <div
          className={`courses-list ${ isSidebarExpanded ? "sidebarExpanded" : ""
            }`}
        >
          {courses.length > 0 &&
            courses.map((data) => (
              <div
                key={data._id}
                className={`courses ${ isSidebarExpanded ? "sidebarExpanded" : ""
                  }`}
              >
                <Link to={`/course/${ data._id }`}>
                  <Card
                    key={data._id}
                    sx={{ width: "100%", aspectRatio: "1/1.2", overflow: "hidden" }}
                  >
                    <CardMedia
                      sx={{ width: "100%", aspectRatio: "2/1" }}
                      image={data.thumbnail}
                      title={data.title}
                    />
                    <CardContent className="box">
                      <Typography variant="h6" component="div">
                        {data.title}
                      </Typography>
                      <span className="level">{data.level}</span>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className="desc"
                      >
                        {filterDesc(data.description)}
                      </Typography>
                      <div className="tags">
                        <Fab variant="extended" size="small" className="tag">
                          {data.category}
                        </Fab>
                      </div>
                      <span className="price">Rs. {data.price}</span>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
        </div>
        {courses.length === 0 && <p>No Course Found</p>}

        {/* {courses.length === 0 && (
              <img
                src="https://cdn.vectorstock.com/i/preview-1x/04/93/no-data-empty-concept-vector-41830493.jpg"
                className="not-found-image"
              ></img>
            )} */}
      </div>
    </Container>
  );
};
export default Search;

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 70px);
  padding: 20px 30px;
  background-color: white;

  .teachers {
    display: flex;
    align-items: flex-start;
    /* background-color: #e7e7e7;
    background-color: white; */
  }

  .teachercards {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    gap: 30px;
  }

  .teachercards > * {
    width: calc(20% - 30px);
    /* overflow: hidden; */
  }
  /* 
  .teachercards.sidebarExpanded > * {
    width: calc(33.33% - 24.5px);
  } */

  @media only screen and (max-width: 600px) {
    .teachercards > * {
      width: calc(100%);
    }
  }

  @media only screen and (min-width: 601px) and (max-width: 800px) {
    .teachercards > * {
      width: calc(33.33% - 24.5px);
    }
    /* 
    .teachercards.sidebarExpanded > * {
      width: calc(50% - 15px);
    } */
  }

  @media only screen and (min-width: 801px) and (max-width: 1400px) {
    .teachercards > * {
      width: calc(25% - 24.5px);
    }

    .teachercards.sidebarExpanded > * {
      width: calc(33.33% - 24.5px);
    }
  }

  .videos-page {
    width: 100%;
    height: 100%;
  }

  .videos {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 30px;
  }

  .videos > * {
    width: calc(100%);
    a {
      text-decoration: none;
    }
  }

  .videos.sidebarExpanded > * {
    width: calc(100%);
  }

  @media only screen and (min-width: 601px) and (max-width: 800px) {
    .videos > * {
      width: calc(50% - 15px);
    }

    .videos.sidebarExpanded > * {
      width: calc(50% - 15px);
    }
  }

  @media only screen and (min-width: 801px) and (max-width: 1200px) {
    .videos > * {
      width: calc(33.333% - 20px);
    }

    .videos.sidebarExpanded > * {
      width: calc(50% - 15px);
    }
  }

  @media only screen and (min-width: 1201px) and (max-width: 1400px) {
    .videos > * {
      width: calc(33.333% - 20px);
    }

    .videos.sidebarExpanded > * {
      width: calc(33.333% - 20px);
    }
  }

  @media only screen and (min-width: 1401px) {
    .videos > * {
      width: calc(25% - 24.5px);
    }

    .videos.sidebarExpanded > * {
      width: calc(25% - 24.5px);
    }
  }

  .course-container {
    width: 100%;
    background-color: white;
    padding: 20px 30px;
    /* margin: auto; */
    /* margin-top: 0.7rem; */
    /* font-family: "Roboto",sans-serif; */
  }
  .course-container .header-text h6 {
    font-weight: 400;
    color: rgb(77, 76, 76);
  }
  /* CSS */
  .button-61 {
    align-items: center;
    appearance: none;
    background-color: #4a56b8;
    border-radius: 0.375em;
    box-shadow: none;
    box-sizing: border-box;
    color: #ffffff;
    cursor: pointer;
    margin-left: 0.7rem;
    display: inline-flex;
    font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Helvetica,
      Arial, sans-serif;
    font-size: 0.85rem;
    height: 2.8em;
    justify-content: center;
    line-height: 1.5;
    padding: calc(0.5em - 1px) 1em;
    position: relative;
    padding-left: 1.3rem;
    padding-right: 1.3rem;
    text-align: center;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: top;
    white-space: nowrap;
  }

  .button-61:active {
    border-color: #4a4a4a;
    outline: 0;
  }

  .button-61:focus {
    border-color: #485fc7;
    outline: 0;
  }

  .button-61:hover {
    background-color: rgb(71, 89, 206);
  }

  .button-61:focus:not(:active) {
    box-shadow: rgba(72, 95, 199, 0.25) 0 0 0 0.125em;
  }
  .courses-list {
    width: 100%;
    display: flex;
    flex-direction: row;
    height: 100%;
    flex-wrap: wrap;
    gap: 30px;
  }

  .courses-list > * {
    width: 100%;
  }

  .courses-list.sidebarExpanded > * {
    width: 100%;
  }

  @media only screen and (min-width: 601px) and (max-width: 800px) {
    .courses-list > * {
      width: calc(50% - 15px);
    }

    .courses-list.sidebarExpanded > * {
      width: calc(50% - 15px);
    }
  }

  @media only screen and (min-width: 801px) and (max-width: 1200px) {
    .courses-list > * {
      width: calc(33.333% - 20px);
    }

    .courses-list.sidebarExpanded > * {
      width: calc(50% - 15px);
    }
  }

  @media only screen and (min-width: 1201px) and (max-width: 1400px) {
    .courses-list > * {
      width: calc(33.333% - 20px);
    }

    .courses-list.sidebarExpanded > * {
      width: calc(33.333% - 20px);
    }
  }

  @media only screen and (min-width: 1401px) {
    .courses-list > * {
      width: calc(25% - 24.5px);
    }

    .courses-list.sidebarExpanded > * {
      width: calc(25% - 24.5px);
    }
  }

  .courses-list .courses {
    /* margin-right: 1rem;
        margin-bottom: 1rem; */
    /* width:  */

    a {
      text-decoration: none;
    }
  }
  .courses-list .courses .level {
    font-weight: 700;
    background: -webkit-linear-gradient(90deg, #6980b5, #3f469d, blue);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .courses-list .courses .price {
    font-weight: 700;
    color: black;
  }
  .courses-list .courses .desc {
    padding: 0px;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
  }
  .courses-list .courses .tag {
    background-color: #282727;
    color: white;
    text-transform: none;
    font-size: 0.8rem;
    /* margin: 0.1rem; */
    z-index: 1;
  }
  .courses-list .courses .box1 {
    height: fit-content;
  }

  .pagination {
    margin-top: auto;
  }
  .pagination .pages {
    margin: auto;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  .loader-page {
    text-align: center;
  }
`;
