import VideoCard from './VideoCard'
import "./HomepageTeacher.css"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Fab from "@mui/material/Fab"
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const InstructorHome=()=>{
    const filterDesc=(text)=>{
        return text.slice(0,100);
    }
    const toMin=(val)=>{
        var duration="";
        var min=parseInt(val);
        if(min){
          duration+=min+" m"
        }
        else{
          duration+="1 m"
        }
        return duration
    }
    return <>
        <div className="home-page">
            <div className="header1">
                {/* <span className="line1"></span> */}
                <h5>Videos</h5>
                {/* <span className="line2"></span> */}
            </div>
            <div className="video-lists">
                <div className="videos">
                    <div className='video'>
                        <VideoCard
                            id={"65ae816ece773366e538d9ed"}
                            title={"Videos"}
                            description={"This video is created by spiderman"}
                            duration={toMin(125)}
                            thumbnail={"https://res.cloudinary.com/desdkbhvz/image/upload/v1705578484/j680f6u20a426xagjlys.png"}
                            profileImage={"https://res.cloudinary.com/desdkbhvz/image/upload/v1705077731/u17mqgolmdz2owhrwzkv.jpg"}
                        />
                    </div>
                    <div className='video'>
                        <VideoCard
                            id={"65ae816ece773366e538d9ed"}
                            title={"Videos"}
                            description={"This video is created by spiderman"}
                            duration={toMin(125)}
                            thumbnail={"https://res.cloudinary.com/desdkbhvz/image/upload/v1705578484/j680f6u20a426xagjlys.png"}
                            profileImage={"https://res.cloudinary.com/desdkbhvz/image/upload/v1705077731/u17mqgolmdz2owhrwzkv.jpg"}
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="home-page">
            <div className="header1">
                <span className="line1"></span>
                <h5>Courses</h5>
                <span className="line2"></span>
            </div>
            <div className="courses-list">
            <div className="courses">
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 180 }}
                        image="data:image/png;base64,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"
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography variant="h6" component="div">
                        ReactJS
                        </Typography>
                        <span className='level'>Intermediate</span>
                        <Typography variant="body2" color="text.secondary" className='desc'>
                            {filterDesc("React.js is an open-source JavaScript library for building user interfaces, known for its declarative syntax, component-based architecture, and efficient updates through a virtual DOM.")}
                        </Typography>
                        <div className='tags'>
                            <Fab variant="extended" size="small" className='tag'>
                                Coding
                            </Fab>
                            <Fab variant="extended" size="small" className='tag'>
                                Programming
                            </Fab>
                        </div>
                        <span className='price'>$30</span>
                    </CardContent>
                    <CardActions>
                        <button className='button-61'>Buy</button>
                    </CardActions>
                </Card>
            </div>
            <div className="courses">
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 180 }}
                        image="data:image/png;base64,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"
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography variant="h6" component="div">
                        ReactJS
                        </Typography>
                        <span className='level'>Intermediate</span>
                        <Typography variant="body2" color="text.secondary" className='desc'>
                            {filterDesc("React.js is an open-source JavaScript library for building user interfaces, known for its declarative syntax, component-based architecture, and efficient updates through a virtual DOM.")}
                        </Typography>
                        <div className='tags'>
                            <Fab variant="extended" size="small" className='tag'>
                                Coding
                            </Fab>
                            <Fab variant="extended" size="small" className='tag'>
                                Programming
                            </Fab>
                        </div>
                        <span className='price'>$30</span>
                    </CardContent>
                    <CardActions>
                        <button className='button-61'>Buy</button>
                    </CardActions>
                </Card>
            </div>
            <div className="courses">
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 180 }}
                        image="data:image/png;base64,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"
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography variant="h6" component="div">
                        ReactJS
                        </Typography>
                        <span className='level'>Intermediate</span>
                        <Typography variant="body2" color="text.secondary" className='desc'>
                            {filterDesc("React.js is an open-source JavaScript library for building user interfaces, known for its declarative syntax, component-based architecture, and efficient updates through a virtual DOM.")}
                        </Typography>
                        <div className='tags'>
                            <Fab variant="extended" size="small" className='tag'>
                                Coding
                            </Fab>
                            <Fab variant="extended" size="small" className='tag'>
                                Programming
                            </Fab>
                        </div>
                        <span className='price'>$30</span>
                    </CardContent>
                    <CardActions>
                        <button className='button-61'>Buy</button>
                    </CardActions>
                </Card>
            </div>
            <div className="courses">
            <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 170 }}
                        image="data:image/png;base64,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"
                        title="green iguana"
                    />
                    <CardContent className='box'>
                        <Typography variant="h6" component="div">
                        ReactJS
                        </Typography>
                        <span className='level'>Intermediate</span>
                        <Typography variant="body2" color="text.secondary" className='desc'>
                            {filterDesc("React.js is an open-source JavaScript library for building user interfaces, known for its declarative syntax, component-based architecture, and efficient updates through a virtual DOM.")}
                        </Typography>
                        <div className='tags'>
                            <Fab variant="extended" size="small" className='tag'>
                                Coding
                            </Fab>
                            <Fab variant="extended" size="small" className='tag'>
                                Programming
                            </Fab>
                        </div>
                        <span className='price'>$30</span>
                    </CardContent>
                    <CardActions className='box1'>
                        <button className='button-61'>Buy</button>
                    </CardActions>
                </Card>
            </div>
        </div>
        </div>
    </>
}
export default InstructorHome