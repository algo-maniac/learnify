import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useRef, useState } from "react";
import { CircularProgress, Pagination } from "@mui/material";
import styled from "styled-components";
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";

const EnrolledCourses = () => {
  const { userdata, isSidebarExpanded } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [course, setCourses] = useState([]);
  const [courseLength, setLength] = useState(0);
  const navigate = useNavigate();

  const filterDesc = (text) => {
    return text.slice(0, 100);
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const fetchHandler = async () => {
    setLoading(true);
    const data = await fetch(
      `${process.env.REACT_APP_BASE_URL}/instructor/getInstructorCourses/${ userdata.id }`,
      {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-type": "application/json",
        },
        body: JSON.stringify({ offset: page }),
      }
    );
    const json = await data.json();
    console.log(json);
    if (json) {
      setCourses(json.courses);
      setLength(json.length_of_courses);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchHandler();
  }, [page]);

  return (
    <>
      <Container>
        <div className="course-container">
          {loading && (
            <div className="loader-page">
              <CircularProgress className="loading" />
            </div>
          )}
          {!loading && (
            <div
              className={`courses-list ${ isSidebarExpanded ? "sidebarExpanded" : ""
                }`}
            >
              {course.length > 0 &&
                course.map((data) => (
                  <div
                    className={`courses ${ isSidebarExpanded ? "sidebarExpanded" : ""
                      }`}
                  >
                    <Card
                      key={data._id}
                      sx={{ width: "100%", overflow: "hidden" }}
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
                        <span className="price">{data.price}</span>
                      </CardContent>
                      <CardActions className="box1">
                        <button
                          className="button-61"
                          onClick={() => navigate(`/course/${ data._id }/edit`)}
                        >
                          Edit
                        </button>
                      </CardActions>
                    </Card>
                  </div>
                ))}
            </div>
          )}
          <div className="pagination">
            <Pagination
              count={parseInt((courseLength + 4) / 5)}
              color="primary"
              onChange={handlePageChange}
              className="pages"
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default EnrolledCourses;

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 70px);
  background-color: white;

  .course-container {
    width: 100%;
    height: (100vh - 240px);
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
    border: 0;
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
    display: flex;
    flex-direction: row;
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

    .courses-list .courses{
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
    background-color: black;
    color: white;
    text-transform: none;
    font-size: 0.72rem;
    margin: 0.1rem;
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
