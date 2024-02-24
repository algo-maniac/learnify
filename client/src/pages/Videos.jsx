import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import VideoCard from '../components/VideoCard'
import { CircularProgress, Pagination } from '@mui/material';
import AuthContext from '../store/auth-context'
import styled from 'styled-components';

const InstructorVideo = () => {
    const { userdata, isSidebarExpanded } = useContext(AuthContext);
    const [page, setPage] = useState(1);
    const [videoLength, setLength] = useState(0);
    const [videos, setVideos] = useState();
    const navigate = useNavigate();

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const getInstructorData = async () => {
        const data = await fetch(`${process.env.REACT_APP_BASE_URL}/video/getVideos`, {
            method: 'POST',
            headers: {
                Authorization: localStorage.getItem("token")
            },
            body: JSON.stringify({ offset: page })
        });
        const json = await data.json();
        console.log(json.instructor);
        setVideos(json.videos);
        setLength(json.totalVideos)
        console.log(json);
    }
    useEffect(() => {
        try {
            getInstructorData();
        } catch (err) {
            console.log(err);
        }
    }, []);
    const toMin = (val) => {
        var duration = "";
        var min = parseInt(val);
        if (min) {
            duration += min + " m"
        }
        else {
            duration += "1 m"
        }
        return duration
    }
    return <>
        <Container>
            <div className="videos-page">
                <div className='create-course-button'>
                    {userdata.role === "instructor" && <button className='button-61' onClick={() => navigate('/upload-video')}>Upload Video</button>}
                </div>
                <br />
                <div className={`videos ${isSidebarExpanded ? 'sidebarExpanded' : ''}`}>
                    {videos && videos.map(vid => {
                        return <div className="video">
                            <VideoCard
                                id={vid._id}
                                title={vid.title}
                                description={vid.description}
                                duration={toMin(vid.duration)}
                                thumbnail={vid.thumbnail}
                                profileImage={vid.instructorId.profileImage}
                            />
                        </div>
                    })
                    }
                </div>
                <div className='pagination'>
                    <Pagination count={parseInt((videoLength + 4) / 5)} color="primary" onChange={handlePageChange} className='pages' />
                </div>
            </div>
        </Container>
    </>
}
export default InstructorVideo

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 70px);
  background-color: white;
  padding: 20px 30px;

  .videos-page {
    width: 100%;
    /* height: 100%; */
    /* height: calc(100vh - 240px); */

    .create-course-button {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
  }

    .videos{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 30px;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .videos > * {
        width: calc(100%);
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

    .button-61 {
        align-items: center;
        appearance: none;
        background-color: #4a56b8;
        border-radius: .375em;
        box-shadow: none;
        box-sizing: border-box;
        color: #ffffff;
        cursor: pointer;
        margin-left: 0.7rem;
        display: inline-flex;
        font-family: BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif;
        font-size: 0.85rem;
        height: 2.8em;
        justify-content: center;
        line-height: 1.5;
        padding: calc(.5em - 1px) 1em;
        position: relative;
        padding-left: 1.3rem;
        padding-right: 1.3rem;
        text-align: center;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        vertical-align: top;
        white-space: nowrap;
        border: none;
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
        box-shadow: rgba(72, 95, 199, .25) 0 0 0 .125em;
    }

  .pagination{
    margin-top: auto;
  }
  .pagination .pages{
      margin: auto;
      margin-top: 2rem;
      margin-bottom: 1rem;
  }
  .loader-page{
      text-align: center;
  }
`