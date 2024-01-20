import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useEffect, useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import "./Search.css"
import { Link, useLocation } from 'react-router-dom';
const Search=()=>{
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    const [courses,setCourses]=useState([])
    const [users,setUsers]=useState([]);
    const [videos,setVideos]=useState([])
    const fetchHandler=async()=>{
        console.log("API Called")
        console.log(query)
        if(query!==""){
            const res=await fetch("/search",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({query:query})
            })
            const data=await res.json();
            setCourses(data.courses);
            setUsers(data.instructor);
            setVideos(data.videos)
            console.log(data)
        }
    }
    useEffect(()=>{
        fetchHandler();
    },[query])
    return <>
        <div className='search-box'>
        <div className='video-box'>
                <div className="header1">
                    <span className="line1"></span>
                    <h5>Instructors</h5>
                    <span className="line2"></span>
                </div>
                <div className='video-list instructor-list'>
                    {users.length>0 && users.map((data)=>(
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
                    {users.length===0 && <h4>No Instructor Found</h4>}
                </div>
            </div>
            <div className='video-box'>
                <div className="header1">
                    <span className="line1"></span>
                    <h5>Videos</h5>
                    <span className="line2"></span>
                </div>
                <div className='video-list'>
                    {videos.length>0 && videos.map((data)=>(
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
                            <p className='description'>{data.description}</p>
                            <p className='likecount'><ThumbUpIcon/>  {1}</p>
                            </CardContent>
                        </CardActionArea>
                        </Link>
                    </Card>
                    ))}
                    {videos.length===0 && <img src='https://cdn.vectorstock.com/i/preview-1x/04/93/no-data-empty-concept-vector-41830493.jpg' className='not-found-image'></img>}
                </div>
            </div>

            <div className='video-box'>
                <div className="header1">
                    <span className="line1"></span>
                    <h5>Courses</h5>
                    <span className="line2"></span>
                </div>
                <div className='video-list'>
                    {courses.length>0 && courses.map((data)=>(
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
                            <p className='description'>This is a video</p>
                            <p className='likecount'><ThumbUpIcon/>  {1}</p>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    ))}
                    {courses.length===0 && <img src='https://cdn.vectorstock.com/i/preview-1x/04/93/no-data-empty-concept-vector-41830493.jpg' className='not-found-image'></img>}
                </div>
            </div>
        </div>
    </>
}
export default Search