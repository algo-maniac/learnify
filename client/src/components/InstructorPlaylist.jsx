import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Fab from "@mui/material/Fab"
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import "./Instructors.css"
import { CircularProgress, Pagination } from '@mui/material';
const InstructorPlaylist=()=>{
    const [latestCourses, setLatestCourses] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [course,setCourses]=useState([]);
    const [courseLength,setLength]=useState(0);
    const filterDesc=(text)=>{
        return text.slice(0,100);
    }
    const handlePageChange = (event, value) => {
        setPage(value);
    };
    const fetchHandler=async()=>{
        setLoading(true)
        const data = await fetch(`http://localhost:8000/instructor/getInstructorCourses/65a16be384dda50de26b9584`, {
            method: 'POST',
            headers: {
                Authorization: localStorage.getItem("token"),
                'Content-type':'application/json'
            },
            body:JSON.stringify({offset:page})
        });
        const json = await data.json();
        console.log(json)
        if(json){
            setCourses(json.courses);
            setLength(json.length_of_courses)
            setLoading(false);
        }
    }
    useEffect(()=>{
        fetchHandler();
    },[page])

    return <>
    <div className="course-container" >
        <div className="header-text">
            <h6>All Courses</h6>
        </div>
        {loading && <div className='loader-page'><CircularProgress className='loading'/></div>}
        {!loading && <div className="courses-list">
                {course.length>0 && course.map((data)=>(
                <div className="courses">
                    <Card sx={{ minWidth: 345 }} key={data._id}>
                    <CardMedia
                        sx={{ height: 170 }}
                        image={data.thumbnail}
                        title="green iguana"
                    />
                    <CardContent className='box'>
                        <Typography variant="h6" component="div">
                        {data.title}
                        </Typography>
                        <span className='level'>{data.level}</span>
                        <Typography variant="body2" color="text.secondary" className='desc'>
                            {filterDesc(data.description)}
                        </Typography>
                        <div className='tags'>
                            <Fab variant="extended" size="small" className='tag'>
                                {data.category}
                            </Fab>
                        </div>
                        <span className='price'>$30</span>
                    </CardContent>
                    <CardActions className='box1'>
                        <button className='button-61'>Buy</button>
                    </CardActions>
                </Card>
                </div>
                ))}
        </div>}
        <div className='pagination'>
            <Pagination count={parseInt((courseLength+4)/5)} color="primary" onChange={handlePageChange} className='pages'/>
        </div>
    </div>
    </>
}
export default InstructorPlaylist