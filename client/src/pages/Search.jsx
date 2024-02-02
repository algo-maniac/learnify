import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useEffect, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [videos, setVideos] = useState([]);
  const fetchHandler = async () => {
    console.log("API Called");
    console.log(query);
    if (query !== "") {
      const res = await fetch("/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query }),
      });
      const data = await res.json();
      setCourses(data.courses);
      setUsers(data.instructor);
      setVideos(data.videos);
      console.log(data);
    }
  };
  useEffect(() => {
    fetchHandler();
  }, [query]);
  return (
    <Container>
      <div className="search-box">
        <div className="video-box">
          <div className="header1">
            <span className="line1"></span>
            <h5>Instructors</h5>
            <span className="line2"></span>
          </div>
          <div className="video-list instructor-list">
            {users.length > 0 &&
              users.map((data) => (
                <Card sx={{ maxWidth: 255 }}>
                  <Link to={`/instructor/${data._id}`}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="150"
                        image={data.profileImage}
                      />
                      <CardContent>
                        <Typography variant="h6" component="div">
                          <h5>{data.username}</h5>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                </Card>
              ))}
            {users.length === 0 && <h4>No Instructor Found</h4>}
          </div>
        </div>
        <div className="video-box">
          <div className="header1">
            <span className="line1"></span>
            <h5>Videos</h5>
            <span className="line2"></span>
          </div>
          <div className="video-list">
            {videos.length > 0 &&
              videos.map((data) => (
                <Card sx={{ maxWidth: 255 }}>
                  <Link to={`/video/${data._id}`}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="150"
                        image={data.thumbnail}
                      />
                      <CardContent>
                        <Typography variant="h5" component="div">
                          <h5>{data.title}</h5>
                        </Typography>
                        <p className="description">{data.description}</p>
                        <p className="likecount">
                          <ThumbUpIcon /> {1}
                        </p>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                </Card>
              ))}
            {videos.length === 0 && (
              <img
                src="https://cdn.vectorstock.com/i/preview-1x/04/93/no-data-empty-concept-vector-41830493.jpg"
                className="not-found-image"
              ></img>
            )}
          </div>
        </div>

        <div className="video-box">
          <div className="header1">
            <span className="line1"></span>
            <h5>Courses</h5>
            <span className="line2"></span>
          </div>
          <div className="video-list">
            {courses.length > 0 &&
              courses.map((data) => (
                <Card sx={{ maxWidth: 255 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="150"
                      image={data.thumbnail}
                    />
                    <CardContent>
                      <Typography variant="h5" component="div">
                        <h5>Title</h5>
                      </Typography>
                      <p className="description">This is a video</p>
                      <p className="likecount">
                        <ThumbUpIcon /> {1}
                      </p>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            {courses.length === 0 && (
              <img
                src="https://cdn.vectorstock.com/i/preview-1x/04/93/no-data-empty-concept-vector-41830493.jpg"
                className="not-found-image"
              ></img>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Search;

const Container = styled.div`
  .search-box {
    margin: 0.7rem;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
  .search-box .video-box {
    display: flex;
    width: 96%;
    padding-bottom: 0px;
    min-width: fit-content;
    min-height: fit-content;
    flex-direction: column;
  }
  .video-box .header1 {
    display: flex;
    width: 100%;
    height: fit-content;
    font-family: "Roboto", sans-serif;
    flex-direction: row;
  }
  .video-box .header1 h5 {
    font-weight: 600;
    width: fit-content;
    color: rgb(57, 57, 173);
  }
  .video-box .line1 {
    border: 1px solid rgb(192, 191, 189);
    width: 2%;
    height: 1%;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 0.34rem;
  }
  .video-box .line2 {
    width: 90%;
    height: 1%;
    margin-left: 0.34rem;
    margin-top: auto;
    margin-bottom: auto;
    border: 1px solid rgb(192, 191, 189);
  }
  .video-box .video-list {
    margin: 0.3rem;
    display: flex;
    flex-wrap: wrap;
  }
  .video-box .video-list .css-46bh2p-MuiCardContent-root {
    margin: 5px;
    padding: 5px;
  }
  .video-box .video-list h5 {
    font-family: "Roboto", sans-serif;
    font-weight: 900;
    margin: 0px;
    color: black;
    font-size: 1.35rem;
    padding: 0px;
  }
  .video-box .video-list .MuiPaper-root {
    margin-left: 0.4rem;
    margin-right: 0.4rem;
    margin-bottom: 0.6rem;
    width: 35%;
  }
  .video-box .video-list .description {
    color: gray;
  }
  .video-box .video-list .likecount svg {
    color: rgb(80, 89, 184);
  }
  .video-box .video-list .link {
    color: rgb(60, 60, 135);
    font-weight: 700;
    font-size: 0.78rem;
  }
  .video-box button:hover {
    background-color: white;
  }
  .video-box .instructor-list .MuiPaper-root {
    width: 15%;
  }
  .video-box .instructor-list .MuiPaper-root {
    text-align: center;
  }
  .video-box .instructor-list img {
    border-radius: 70%;
    height: 100px;
    width: 100px;
    margin: auto;
  }
  .video-box .video-list a {
    text-decoration: none;
  }
  .video-box .not-found-image {
    margin: auto;
  }
`;
